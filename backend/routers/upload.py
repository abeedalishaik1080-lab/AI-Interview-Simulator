from fastapi import APIRouter, File, HTTPException, UploadFile

from services.pdf_parser import (
    CorruptedPDFError,
    EmptyPDFError,
    EncryptedPDFError,
    MissingFileError,
    extract_text,
)
from services.upload_service import save_resume
from services.gemini_service import analyze_resume

router = APIRouter(tags=["upload"])


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided.")

    try:
        content = await file.read()
        saved = save_resume(content, file.filename, file.content_type)
        text = extract_text(saved["saved_path"])
        resume_data = analyze_resume(text)

        return {
            "success": True,
            "filename": saved["filename"],
            "resume": resume_data,
        }
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except MissingFileError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except (EmptyPDFError, CorruptedPDFError, EncryptedPDFError) as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        import traceback
        print("================ FULL ERROR ================")
        traceback.print_exc()
        print("=============================================")
        raise HTTPException(
            status_code=500,
            detail=str(exc),
        ) from exc