from fastapi import APIRouter, UploadFile, File

router = APIRouter()

@router.post("/upload")
async def upload_mri(file: UploadFile = File(...)):
    # Placeholder for saving the file and triggering processing
    return {"filename": file.filename, "status": "uploaded", "scan_id": "scan_12345"}

@router.get("/{scan_id}")
def get_scan(scan_id: str):
    return {"scan_id": scan_id, "status": "processed", "metadata": {}}
