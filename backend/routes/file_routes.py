from flask import Blueprint, request, jsonify
from models import UploadedFile, db
from utils.pdf_parser import parse_pdf
from flask_jwt_extended import jwt_required, get_jwt_identity

file_bp = Blueprint("files", __name__)

@file_bp.route("/upload", methods=["POST"])
@jwt_required()
def upload_file():
    user_id = get_jwt_identity()
    print("User ID:", user_id)  # Debug print
    print("Headers:", request.headers)  # Check headers
    pdf_file = request.files.get("file")
    if not pdf_file:
        return jsonify({"message": "No file uploaded"}), 400

    extracted_data = parse_pdf(pdf_file)
    new_file = UploadedFile(
        filename=pdf_file.filename,
        extracted_text=extracted_data["extracted_text"],
        uploaded_by=user_id["id"],
    )
    db.session.add(new_file)
    db.session.commit()

    return jsonify({"message": "File uploaded successfully", "extracted_text": extracted_data["extracted_text"]}), 200
