from fastapi import APIRouter

router = APIRouter()

@router.get("/status")
def get_system_status():
    return {
        "status": "healthy",
        "gpu_status": "Idle",
        "storage_usage": "45%",
        "model_version": "v1.0.0-beta"
    }

@router.get("/stats")
def get_dashboard_stats():
    return {
        "total_patients": 1248,
        "scans_processed": 3450,
        "segmentation_accuracy": "94.2%",
        "average_inference_time": "1.2s",
        "recent_predictions": 12
    }
