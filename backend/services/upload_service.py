import uuid
from pathlib import Path

from utils.file_validation import validate_pdf_file

UPLOAD_DIR = Path("/tmp/uploads") 


def save_resume(file_content: bytes, original_filename: str, content_type: str | None) -> dict:
    file_size = len(file_content)
    header = file_content[:4]

    validate_pdf_file(original_filename, content_type, file_size, header)

    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    safe_name = f"{uuid.uuid4().hex}.pdf"
    filepath = UPLOAD_DIR / safe_name

    filepath.write_bytes(file_content)

    return {
        "filename": original_filename,
        "saved_path": filepath,
    }
