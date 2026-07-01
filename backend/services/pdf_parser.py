"""
PDF text extraction service using PyMuPDF (fitz).

Provides a single entry point, extract_text(), for reading all text
content from an uploaded resume PDF.
"""

from pathlib import Path

import fitz
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


class PDFParserError(Exception):
    """Base exception for PDF parsing errors."""


class MissingFileError(PDFParserError):
    """Raised when the PDF file does not exist at the given path."""


class EmptyPDFError(PDFParserError):
    """Raised when the PDF contains no extractable text."""


class CorruptedPDFError(PDFParserError):
    """Raised when the PDF file is invalid or cannot be opened."""


class EncryptedPDFError(PDFParserError):
    """Raised when the PDF is password-protected or encrypted."""

from pdf2image import convert_from_path
from PIL import Image


def extract_text_with_ocr(pdf_path: str) -> str:
    images = convert_from_path(
        pdf_path,
        poppler_path=r"C:\Users\ASUS\Downloads\Release-26.02.0-0\poppler\Library\bin"
    )

    full_text = ""

    for image in images:
        text = pytesseract.image_to_string(image)
        full_text += text + "\n"

    return full_text.strip()
def extract_text(pdf_path: str | Path) -> str:
    """
    Open a PDF, read every page, and return all extracted text as one string.

    Args:
        pdf_path: Absolute or relative path to the PDF file on disk.

    Returns:
        All page text joined into a single string.

    Raises:
        MissingFileError: If the file does not exist.
        CorruptedPDFError: If the file is not a valid or readable PDF.
        EncryptedPDFError: If the PDF requires a password to open.
        EmptyPDFError: If no text could be extracted from any page.
    """
    path = Path(pdf_path)

    # Ensure the file exists before attempting to open it
    if not path.is_file():
        raise MissingFileError(f"PDF file not found: {path}")

    doc = None
    try:
        # Open the PDF document; fitz raises on corrupted or invalid files
        doc = fitz.open(path)
    except fitz.FileDataError as exc:
        raise CorruptedPDFError("The PDF file is corrupted or invalid.") from exc
    except Exception as exc:
        raise CorruptedPDFError("Unable to read the PDF file.") from exc

    try:
        # Reject password-protected PDFs that cannot be read without a password
        if doc.is_encrypted and doc.needs_pass:
            raise EncryptedPDFError("The PDF is encrypted and requires a password.")

        # Extract text from every page and combine into one string
        page_texts = []

        print("=" * 60)
        print("PDF DEBUG")
        print("Pages:", len(doc))

        for i, page in enumerate(doc):
            text = page.get_text("text")

            print(f"\n----- PAGE {i+1} -----")
            print(repr(text[:300]))
            print("Length:", len(text))

            page_texts.append(text)

        combined_text = "\n".join(page_texts).strip()

        print("\nCombined Length:", len(combined_text))
        print("=" * 60)

        if not combined_text:
            print("No text found with PyMuPDF. Trying OCR...")

            combined_text = extract_text_with_ocr(str(path))

            if not combined_text:
                raise EmptyPDFError("The PDF contains no extractable text with PyMuPDF or OCR.")

        return combined_text
    finally:
        if doc is not None:
            doc.close()