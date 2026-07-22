# DarshanEase – Temple Darshan Ticket Booking System

DarshanEase is a complete full-stack MERN (MongoDB, Express, React, Node.js) application that provides a seamless platform for booking temple darshan tickets. It features a modern, responsive, and beautiful UI designed with Tailwind CSS.

## Features

**User Features:**
- User Registration & Login with JWT Authentication
- Browse Temples with Search and State Filter
- View Temple Details & Available Slots
- Book Darshan Slots
- View Booking History
- Download Booking Receipt as PDF with QR Code
- Cancel Bookings
- User Profile
- Dark Mode Support
- Fully Responsive Design

**Admin Features:**
- Admin Dashboard with Statistics
- Manage Temples (Add, Edit, Delete)
- View All Bookings

## Tech Stack

- **Frontend:** React.js (Vite), React Router DOM, Tailwind CSS, Axios, Lucide React (Icons), jsPDF, qrcode.react
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Helmet, Morgan

## Project Structure

```
DarshanEase/
 ├── client/          # React Frontend
 ├── server/          # Node.js/Express Backend
 └── README.md
```

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed and running locally (or a MongoDB Atlas URI)

### Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   A `.env` file is already provided for development. If you need to change anything, refer to `.env.example`.
4. Start the backend server:
   ```bash
   npm start
   # or for development with nodemon:
   npm run dev
   ```
   The server will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The client will run on `http://localhost:5173`.

## Default Admin Credentials
To access the admin dashboard, you can register a new user and manually change their role to `'admin'` in your MongoDB database, or modify the user creation logic temporarily to allow admin creation.
