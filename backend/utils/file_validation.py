MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB
ALLOWED_CONTENT_TYPES = {"application/pdf"}
ALLOWED_EXTENSION = ".pdf"
PDF_MAGIC_BYTES = b"%PDF"


def validate_pdf_file(filename: str, content_type: str | None, file_size: int, header: bytes) -> None:
    if not filename.lower().endswith(ALLOWED_EXTENSION):
        raise ValueError("Only PDF files are allowed.")

    if content_type and content_type not in ALLOWED_CONTENT_TYPES:
        raise ValueError("Invalid file type. Only PDF files are allowed.")

    if file_size > MAX_FILE_SIZE:
        raise ValueError("File size exceeds the 5 MB limit.")

    if not header.startswith(PDF_MAGIC_BYTES):
        raise ValueError("Invalid PDF file.")
