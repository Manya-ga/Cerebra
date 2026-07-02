from fastapi import APIRouter

router = APIRouter()

@router.get("/{scan_id}")
def get_prediction(scan_id: str):
    # Placeholder prediction response
    return {
        "scan_id": scan_id,
        "tumor_type": "Glioblastoma",
        "confidence": 0.98,
        "volume_mm3": 4520.5,
        "segmentation_mask_url": "/outputs/scan_12345_mask.nii.gz"
    }

@router.post("/{scan_id}/run")
def run_prediction(scan_id: str):
    return {"scan_id": scan_id, "status": "processing"}
