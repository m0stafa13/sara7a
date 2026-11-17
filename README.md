# Sara7a Backend API

## 📝 Overview
Sara7a is a Node.js (Express) backend application that provides authentication, user management, and messaging features. It uses MongoDB with Mongoose for data persistence, Redis for OTP verification, JWT for authentication, and Nodemailer for email verification.

## 🛠️ Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Redis (local or Upstash)
- Gmail account (for email functionality) OR configure your own email service

## 📦 Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd code
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment setup
Copy the development environment file and configure your settings:
```bash
copy .env.dev .env
# OR create .env file with the following structure:
```

### 4. Configure environment variables
Create a `.env` file based on `.env.dev`:
```env
# Port
PORT=4000

# Mode (dev/prod)
MODE=dev

# MongoDB URI (local or Atlas)
URI=mongodb://localhost:27017/sara7a_app

# bcrypt salt rounds
SALT_ROUND=8

# JWT signatures (generate secure random strings)
USER_SIGNATURE=your_user_signature_here
ADMIN_SIGNATURE=your_admin_signature_here
USER_REFRESH_SIGNATURE=your_user_refresh_signature_here
ADMIN_REFRESH_SIGNATURE=your_admin_refresh_signature_here

# Application settings
APP_PASSWORD=your_app_password
APP_EMAIL=your_gmail@example.com

# Redis URI (Upstash or local)
REDIS_URI=redis://localhost:6379
```

## 🚀 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run run:dev` | Start development server with auto-reload (`NODE_ENV=dev`) |
| `npm run run:prod` | Start production server (`NODE_ENV=prod`) |

## 📁 Project Structure

```
src/
├── main.js              # Entry point - initializes app, DB, Redis, routes
├── config/
│   └── config.service.js # Environment variables loader
├── db/
│   ├── connection/      # MongoDB connection
│   ├── model/           # Mongoose models (User, Message)
│   └── redis/           # Redis connection and utilities
├── common/
│   ├── enum/            # User enums (gender, role, provider)
│   ├── exceptions/      # Custom error classes (BadRequest, NotFound, etc.)
│   ├── middleware/      # Auth middleware, validation, multer
│   └── service/         # Helper services (hashing, email, tokens, role check)
└── module/
    ├── auth/            # Authentication routes & services
    │   ├── auth.controller.js
    │   ├── auth.service.js
    │   └── auth.validation.js
    └── messages/        # Messaging routes & services
        ├── message.controller.js
        ├── message.service.js
        └── message.validation.js
```

## 🔐 Key Features

### Authentication
- **Sign up**: Register new users with email verification (OTP sent via email)
- **Sign in**: Login with email/password, receive access + refresh tokens
- **Account verification**: Verify email using OTP stored in Redis
- **Role-based access**: Users (role=0) and Admins (role=1)

### Messaging
- **Send messages**: Users can send messages to other users by ID
- **Get all messages**: Admin-only endpoint to retrieve all messages
- **User messages**: Get messages received by a specific user
- **User data lookup**: Find user by custom URL path

### Security
- JWT access tokens (30 min expiration)
- JWT refresh tokens (1 year expiration)
- Password hashing with bcrypt
- Role-based access control
- Input validation with Zod
- File upload with type validation (PNG, JPG)

## 🌐 API Endpoints

### Authentication Routes (`/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/sign-up` | Register new user |
| `GET` | `/sign-in` | User login |
| `GET` | `/get-user-by-id-token` | Get user data (requires auth) |
| `GET` | `/generate-access-token` | Refresh access token |
| `PUT` | `/verify-account` | Verify account with OTP |

### Messages Routes (`/messages`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/get-message` | Get all messages (Admin only) |
| `POST` | `/send-message` | Send message to user |
| `GET` | `/get-user` | Get user data by URL |
| `GET` | `/user-message` | Get current user's messages (requires auth) |

## ⚙️ Technologies Used

- **Node.js** with **Express** - Web framework
- **Mongoose** - MongoDB ODM
- **Redis** - Caching and OTP storage
- **jsonwebtoken** - JWT authentication
- **bcrypt** - Password hashing
- **nodemailer** - Email sending
- **multer** - File upload handling
- **zod** - Schema validation
- **cross-env** - Environment variable handling
- **dotenv** - Environment configuration

## ⚠️ Known Issues & Fixes (Already Applied)

| Issue | File | Fix Applied |
|-------|------|-------------|
| Schema mismatch in auth controller | `src/module/auth/auth.controller.js` | Swapped signUp/signIn schemas |
| Role check using `.includes()` | `src/common/service/checkRole.js` | Changed to direct equality (`!==`) |
| Invalid role variable in token service | `src/common/service/token.service.js` | Fixed `role = user` → `role = "admin"` |
| GET request using req.body | `src/module/messages/message.controller.js` | Changed to `req.query` |
| checkRole receiving array | `src/module/messages/message.controller.js` | Changed `checkRole(["1"])` to `checkRole("1")` |

## 📦 Development

### Running in development mode
```bash
npm run run:dev
```

### Running in production mode
```bash
npm run run:prod
```

### Running tests (if applicable)
```bash
# Add your test command here
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Contact

- **Project**: Sara7a Backend Assignment
- **Developer**: mosmahmoud080