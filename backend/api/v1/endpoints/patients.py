from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_patients():
    return [
        {"id": 1, "name": "John Doe", "age": 45, "last_scan": "2023-10-27"},
        {"id": 2, "name": "Jane Smith", "age": 62, "last_scan": "2023-10-25"}
    ]

@router.get("/{patient_id}")
def get_patient(patient_id: int):
    return {"id": patient_id, "name": "John Doe", "age": 45, "history": []}
