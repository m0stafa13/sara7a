# Sara7a Backend API

## 📝 Overview
Sara7a is a Node.js (Express) backend application that provides authentication, user management, and messaging features. It uses MongoDB with Mongoose for data persistence, Redis for OTP verification, JWT for authentication, and Nodemailer for email verification.

## 🛠️ Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Redis (local or Upstash)
- Gmail account (for email functionality) OR configure your own email service

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

## 📞 Contact

- **Project**: Sara7a Backend Assignment
- **Developer**: mostafa
