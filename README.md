# Transaction-Safe MERN E-commerce Platform

A full-stack e-commerce application built with the MERN stack and Zustand, focused on **secure authentication**, **atomic order processing**, and **real-world backend concerns** such as rate limiting, validation, and data consistency.

This project was designed to go beyond basic CRUD by handling **order placement using MongoDB transactions** to prevent partial writes and inconsistent state.

> Payment gateways were intentionally excluded because Stripe is not available in my country, and local providers do not offer free tiers. 


## Key Features

### Authentication & Security
- JWT-based authentication for users and admins
- Password hashing with bcrypt
- Role-based access control (admin vs user)
- Rate limiting on sensitive routes
- Secure HTTP headers using Helmet
- Input validation on API requests

### Order & Inventory Management
- **Atomic order placement using Mongoose transactions**
- Stock validation before order creation
- Automatic rollback on failure to prevent partial writes
- Clear order lifecycle management
- Admin-only order status updates

### Media Handling
- Image uploads using Multer
- Cloud storage integration with Cloudinary

### State Management
- Global client state handled with Zustand
- Lightweight and predictable store structure


## Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS
- Zustand
- React Router
- Axios
- React-icons

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT
- bcrypt
- Multer
- Cloudinary
- Helmet


## Order Placement Flow (Simplified)
Client → Auth → Validate Input
→ Start Transaction
→ Check Product Stock
→ Create Order
→ Update Inventory
→ Commit / Rollback
→ Response


## Installation & Setup

### Prerequisites
- Node.js
- MongoDB

### Clone the repository
```bash
git clone https://github.com/mekariyas/ecommerce
cd ecommerce
```

# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
