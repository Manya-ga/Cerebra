from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from backend.models.user import RoleEnum

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: Optional[RoleEnum] = RoleEnum.doctor
    hospital: Optional[str] = None
    department: Optional[str] = None
    profile_image: Optional[str] = None

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    last_login: Optional[datetime]

    class Config:
        from_attributes = True
