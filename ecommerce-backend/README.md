E-Commerce Backend System

Project Overview

This project is a secure and scalable E-Commerce Backend System developed using Node.js, Express.js, MongoDB, JWT and bcryptjs.

Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- REST API

Features

- User Registration and Login
- JWT Authentication
- Role-Based Access Control
- Admin, User and Guest Roles
- Product CRUD Operations
- Product Search, Filter and Sort
- Order Management
- User Profile Management
- Product Recommendations
- Input Validation
- Error Handling
- Password Encryption

API Routes

Authentication

- POST "/api/auth/register"
- POST "/api/auth/login"

Products

- GET "/api/products"
- POST "/api/products"
- PUT "/api/products/:id"
- DELETE "/api/products/:id"

Profile

- GET "/api/profile"
- PUT "/api/profile"

Orders

- POST "/api/orders"
- GET "/api/orders"
- GET "/api/orders/:id"
- PUT "/api/orders/:id"
- DELETE "/api/orders/:id"

Recommendations

- GET "/api/recommendations"

Installation

npm install

Create a ".env" file and configure:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the development server:

npm run dev

The API runs on:

http://localhost:5000

Project Structure

ecommerce-backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md

Security

Passwords are encrypted using bcryptjs and protected routes use JWT authentication. Role-based authorization is implemented for restricted operations.

Author

E-Commerce Backend System Project