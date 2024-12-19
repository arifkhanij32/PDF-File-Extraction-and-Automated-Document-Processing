import re
from flask import Blueprint, request, jsonify
from models import TemplateKey, UploadedFile
from extensions import db

template_bp = Blueprint("templates", __name__, url_prefix="/template-keys")

@template_bp.route("/", methods=["GET", "POST"], strict_slashes=False)
def get_or_create_templates():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight successful"}), 200

    if request.method == "GET":
        # Fetch all template keys
        templates = TemplateKey.query.all()
        templates_list = [{"id": t.id, "name": t.name, "description": t.description} for t in templates]
        return jsonify({"templates": templates_list}), 200

    if request.method == "POST":
        try:
            # Get input data
            data = request.get_json()
            if not data or not data.get("name"):
                return jsonify({"message": "Key name is required"}), 400

            # Fetch the latest uploaded file's extracted_text
            latest_file = UploadedFile.query.order_by(UploadedFile.uploaded_at.desc()).first()
            if not latest_file:
                print("No UploadedFile found")  # Debug
                return jsonify({"message": "No uploaded files found to extract data"}), 404

            print("Extracted Text:", latest_file.extracted_text)  # Debug print
            extracted_text = latest_file.extracted_text

            # Search for the relevant details from the extracted text
            key_name = data["name"]
            matched_text = extract_relevant_section(extracted_text, key_name)

            if not matched_text:
                return jsonify({"message": f"No relevant details found for '{key_name}'"}), 404

            # Create a new TemplateKey
            new_template = TemplateKey(
                name=key_name,
                description=matched_text  # Use only the matched section
            )
            db.session.add(new_template)
            db.session.commit()

            return jsonify({
                "message": "Template key created successfully",
                "id": new_template.id,
                "description": matched_text
            }), 201
        except Exception as e:
            print("Error:", e)  # Debug print for exceptions
            return jsonify({"message": "Failed to add key", "error": str(e)}), 500

def extract_relevant_section(text, keyword):
    """
    Extract the section of text starting with the keyword until the next section or end of the text.
    """
    try:
        # Match text starting with the keyword until the next occurrence of "Name:" or end of text
        pattern = rf"{keyword}.*?(?=\nName:|\Z)"
        match = re.search(pattern, text, re.DOTALL | re.IGNORECASE)
        return match.group(0).strip() if match else None
    except Exception as e:
        print(f"Error extracting section: {e}")
        return None

# Handle PUT requests with strict_slashes disabled
@template_bp.route("/<int:id>", methods=["PUT"], strict_slashes=False)
def update_template(id):
    try:
        template = TemplateKey.query.get(id)
        if not template:
            return jsonify({"message": "Template not found"}), 404
        data = request.get_json()
        template.name = data.get("name", template.name)
        template.description = data.get("description", template.description)
        db.session.commit()
        return jsonify({"message": "Template key updated successfully"}), 200
    except Exception as e:
        return jsonify({"message": "Failed to update key", "error": str(e)}), 500

# Handle DELETE requests with strict_slashes disabled
@template_bp.route("/<int:id>", methods=["DELETE"], strict_slashes=False)
def delete_template(id):
    try:
        template = TemplateKey.query.get(id)
        if not template:
            return jsonify({"message": "Template not found"}), 404
        db.session.delete(template)
        db.session.commit()
        return jsonify({"message": "Template key deleted successfully"}), 200
    except Exception as e:
        return jsonify({"message": "Failed to delete key", "error": str(e)}), 500
