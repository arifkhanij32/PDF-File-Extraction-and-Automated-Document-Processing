from PyPDF2 import PdfReader

def parse_pdf(file):
    extracted_text = ""
    pdf_reader = PdfReader(file.stream)
    for page in pdf_reader.pages:
        extracted_text += page.extract_text() or ""  # Safely append extracted text
    return {"extracted_text": extracted_text}
