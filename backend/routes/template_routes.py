from flask import Blueprint, request, jsonify
from models import TemplateKey
from extensions import db

template_bp = Blueprint("templates", __name__, url_prefix="/template-keys")

# Handle GET and POST with strict_slashes disabled explicitly
@template_bp.route("/", methods=["GET", "POST"], strict_slashes=False)
def get_or_create_templates():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight successful"}), 200

    if request.method == "GET":
        templates = TemplateKey.query.all()
        templates_list = [{"id": t.id, "name": t.name, "description": t.description} for t in templates]
        return jsonify({"templates": templates_list}), 200

    if request.method == "POST":
        try:
            data = request.get_json()
            if not data or not data.get("name"):
                return jsonify({"message": "Key name is required"}), 400

            new_template = TemplateKey(name=data["name"], description=data.get("description", ""))
            db.session.add(new_template)
            db.session.commit()

            return jsonify({"message": "Template key created successfully", "id": new_template.id}), 201
        except Exception as e:
            return jsonify({"message": "Failed to add key", "error": str(e)}), 500

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
