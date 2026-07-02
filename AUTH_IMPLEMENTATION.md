# Cerebra - JWT Authentication Implementation

## Overview
This document describes the complete JWT Authentication system implemented for the Cerebra medical platform with Doctor login, registration, and role-based access control.

## Features Implemented

### Backend Authentication Features
✅ **User Registration** - Register new doctors with email validation
✅ **Password Hashing** - Secure bcrypt password hashing
✅ **Strong Password Validation** - 8+ chars, uppercase, lowercase, numbers, special characters
✅ **JWT Tokens** - Access and Refresh tokens with HTTPOnly cookies
✅ **Protected Routes** - All endpoints (except auth) require valid JWT token
✅ **Role-Based Access** - Support for Doctor, Radiologist, Admin, Researcher roles
✅ **Token Refresh** - Automatic token refresh mechanism
✅ **User Logout** - Secure logout with cookie clearing
✅ **SQLite Database** - Persistent user storage with SQLAlchemy ORM

### Frontend Features
✅ **Professional Login Page** - Beautiful Tailwind CSS design with Cerebra branding
✅ **Registration Page** - Full registration form with validation feedback
✅ **Protected Routes** - Routes require authentication
✅ **Auth Context** - Global authentication state management
✅ **JWT Token Storage** - Secure HttpOnly cookie handling
✅ **Auto Token Refresh** - Automatic refresh on 401 errors
✅ **Responsive Design** - Works on desktop and mobile

## Project Structure

```
cerebra/
├── backend/
│   ├── .env                    # Environment variables (IMPORTANT: Keep secret)
│   ├── requirements.txt
│   ├── main.py                 # FastAPI app with CORS and table initialization
│   ├── auth/
│   │   ├── security.py         # JWT and password utilities
│   │   └── deps.py             # Dependency injection for auth
│   ├── models/
│   │   └── user.py             # SQLAlchemy User model
│   ├── schemas/
│   │   ├── user.py             # Pydantic user schemas
│   │   └── token.py            # Token schemas
│   ├── api/v1/
│   │   ├── api.py              # Router initialization
│   │   └── endpoints/
│   │       └── auth.py         # Authentication endpoints
│   └── database/
│       └── session.py          # Database configuration
│
├── frontend/
│   ├── .env.local              # Frontend environment variables
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx        # Professional login page
│   │   │   └── Register.jsx     # Registration form
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Global auth state
│   │   ├── services/
│   │   │   └── api.js           # Axios instance with credentials
│   │   └── components/
│   │       └── ProtectedRoute.jsx # Route protection
```

## Environment Configuration

### Backend (.env)
```
SECRET_KEY=your-super-secret-key-change-this-in-production-12345678
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
DATABASE_URL=sqlite:///./cerebra.db
CORS_ORIGINS=http://localhost,http://localhost:5173,http://127.0.0.1:5173
ENVIRONMENT=development
```

### Frontend (.env.local)
```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## API Endpoints

### Authentication Endpoints (No Auth Required)
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and receive JWT tokens
- `POST /api/v1/auth/refresh` - Refresh access token

### Protected Endpoints (Auth Required)
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user info

### Other Protected Routes (Auth Required)
- `/api/v1/system/*` - System endpoints
- `/api/v1/patients/*` - Patient management
- `/api/v1/mri/*` - MRI scan endpoints
- `/api/v1/predictions/*` - AI predictions

## Running the Application

### Start Backend Server
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn backend.main:app --reload --port 8000
```

**Backend runs at:** `http://localhost:8000`
**API Docs:** `http://localhost:8000/docs`

### Start Frontend Dev Server
```powershell
cd frontend
npm install
npm run dev
```

**Frontend runs at:** `http://localhost:5173`

## Login Credentials (For Testing)

After registering a user:
1. Navigate to `http://localhost:5173/register`
2. Fill in the registration form with:
   - Full Name: Dr. Jane Doe
   - Email: jane@hospital.com
   - Password: SecurePass123! (must meet requirements)
   - Hospital: General Medical Center (optional)

3. Click Register and navigate to login
4. Use the email and password to login

## Password Requirements
- Minimum 8 characters
- At least 1 uppercase letter (A-Z)
- At least 1 lowercase letter (a-z)
- At least 1 number (0-9)
- At least 1 special character (!@#$%^&*(),.?":{}|<>)

Example: `DocPassword123!`

## Authentication Flow

### Login Flow
1. User enters email and password on Login page
2. Frontend sends POST request to `/auth/login`
3. Backend validates credentials and creates JWT tokens
4. Tokens are stored as HttpOnly cookies (secure)
5. Frontend receives success response and redirects to dashboard

### Protected Route Access
1. User tries to access protected route
2. Frontend checks if user exists in AuthContext
3. If no user, redirects to login
4. If user exists but token expired, backend returns 401
5. Frontend automatically calls `/auth/refresh`
6. If successful, retries original request

### Logout Flow
1. User clicks logout
2. Frontend calls `/auth/logout`
3. Backend clears cookies and returns success
4. Frontend clears user state and redirects to login

## Security Features

### Password Security
✅ Bcrypt hashing with salt
✅ Strong password validation enforced at registration
✅ Password never stored in plaintext

### Token Security
✅ JWT with expiration times
✅ HttpOnly cookies prevent XSS attacks
✅ SameSite=Lax cookie policy prevents CSRF
✅ Separate access and refresh tokens

### API Security
✅ CORS configured for development
✅ All endpoints (except auth) require valid JWT
✅ User can only access their own data
✅ Role-based access control ready

## Troubleshooting

### "ModuleNotFoundError: No module named 'backend'"
- Make sure you're running from the project root directory
- Use: `python -m uvicorn backend.main:app --reload --port 8000`

### CORS Errors
- Check that backend is running on http://localhost:8000
- Check that CORS_ORIGINS in .env includes frontend URL
- Make sure cookies are being sent (withCredentials: true)

### Login Not Working
- Check that user exists with email in SQLite database
- Verify password meets requirements
- Check browser console for error details
- Check backend logs for validation errors

### Token Expiration
- Access token expires after 30 minutes (configurable)
- Refresh token expires after 7 days
- Frontend automatically refreshes on 401 errors

## Production Deployment

Before deploying to production:

1. **Change SECRET_KEY** - Use a strong random string
   ```bash
   python -c "import secrets; print(secrets.token_urlsafe(32))"
   ```

2. **Use PostgreSQL** - Not SQLite
   ```
   DATABASE_URL=postgresql://user:password@localhost/cerebra
   ```

3. **Set CORS Origins** - Only allow your frontend domain
   ```
   CORS_ORIGINS=https://yourfrontend.com
   ```

4. **Enable HTTPS** - Set secure=True in cookie settings

5. **Use Environment Manager** - Consider using python-dotenv or secrets management service

6. **Rate Limiting** - Implement login attempt rate limiting

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    full_name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    hashed_password VARCHAR NOT NULL,
    role ENUM (Doctor, Radiologist, Admin, Researcher) DEFAULT "Doctor",
    hospital VARCHAR,
    department VARCHAR,
    profile_image VARCHAR,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    last_login TIMESTAMP
);
```

## Next Steps

- [ ] Implement password reset functionality
- [ ] Add email verification
- [ ] Implement 2FA for enhanced security
- [ ] Add account lockout after failed attempts
- [ ] Setup audit logging for authentication events
- [ ] Implement role-based middleware
- [ ] Add profile image upload
- [ ] Setup automated database backups

## Support

For issues or questions, please check:
1. Browser console for client-side errors
2. Backend logs for server errors
3. API documentation at `http://localhost:8000/docs`
