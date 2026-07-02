from fastapi import APIRouter, Depends
from backend.api.v1.endpoints import patients, mri, predictions, system, auth
from backend.auth.deps import get_current_active_user

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(system.router, prefix="/system", tags=["system"], dependencies=[Depends(get_current_active_user)])
api_router.include_router(patients.router, prefix="/patients", tags=["patients"], dependencies=[Depends(get_current_active_user)])
api_router.include_router(mri.router, prefix="/mri", tags=["mri"], dependencies=[Depends(get_current_active_user)])
api_router.include_router(predictions.router, prefix="/predictions", tags=["predictions"], dependencies=[Depends(get_current_active_user)])
