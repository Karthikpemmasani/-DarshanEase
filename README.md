# 🛕 DarshanEase – Temple Darshan Ticket Booking System

![React](https://img.shields.io/badge/React-18.x-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5.x-purple.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC.svg)
![NodeJS](https://img.shields.io/badge/Node.js-18.x-green.svg)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-4EA94B.svg)
![Deployment](https://img.shields.io/badge/Deployment-Vercel%20%2B%20Render-orange.svg)

**DarshanEase** is a complete, production-ready MERN (MongoDB, Express, React, Node.js) application designed to streamline temple darshan slot bookings, digital ticket pass generation, and administrative temple management across India. It features a modern, responsive, and beautiful UI designed with Tailwind CSS, supporting dark mode, instant QR pass creation, and cross-device synchronization.

---

## 🌐 Live Deployments & Admin Access

> [!IMPORTANT]
> You can test the platform live in your browser:
> * **Frontend Application (Vercel)**: [https://darshan-ease-pied.vercel.app](https://darshan-ease-pied.vercel.app)
> * **Backend API (Render)**: [https://darshanease-6lm4.onrender.com](https://darshanease-6lm4.onrender.com)
> * **Admin Portal Access**: [https://darshan-ease-pied.vercel.app/admin](https://darshan-ease-pied.vercel.app/admin)

### 🛡️ Pre-Configured Admin Login Credentials
* **Admin Email / User ID**: `ADMIN-DARSHAN-2026` or `admin@darshanease.com`
* **Admin Password**: `Admin@2026` or `admin123`
* **Security Access PIN**: `7777`

---

## ✨ Features

### 👤 Devotee Features:
* 🔐 **Authentication & Security**: Register and login with JWT-backed authentication.
* 🔍 **Temple Discovery & State Filters**: Search temples by name, location, or filter by Indian state.
* ❤️ **Favorite Temples**: Save favorite temples (`❤️`) with one click and filter favorites.
* 🎟️ **Instant Darshan Slot Booking**: Select visit date, time slot, enter devotee name and 12-digit Aadhar number.
* 📲 **Digital QR Ticket Pass**: Instant digital pass generation with a unique ticket ID (`TKT-XXXXXX`) and scannable QR code.
* 📥 **PDF Pass Download**: One-click PDF pass download formatted for printing or offline entry verification.
* 📜 **My Bookings History**: View active, completed, and cancelled tickets with persistent cancellation tracking across page refreshes.
* 📷 **Profile Avatar & Email Editing**: Upload custom profile avatar photos and update personal contact details.
* 💬 **Support Desk & Contact Requests**: Submit support tickets (`SUP-XXXXXX`) with category selection.
* 🌙 **Dark Mode Support**: Smooth toggle between Light and Dark aesthetic themes.

### 🛡️ Admin Dashboard Features (`/admin`):
* 📊 **Platform Statistics & Analytics**: Live overview of registered users, active temples, and total bookings.
* ☁️ **Multi-Tier Cross-Device Cloud Sync**: Real-time cross-device sync (`cloudStore.js`) ensuring bookings created on any phone, tablet, or browser appear instantly in the Admin Portal.
* 🔍 **Live Devotee Search Bar**: Search bookings in real time by Devotee Name, Ticket Number (`TKT-...`), Aadhar (Last 4), or Temple Name.
* 📥 **Export CSV Reports**: One-click download of all devotee bookings into a `.csv` spreadsheet file.
* 👁️ **Digital Ticket Pass Preview Modal**: Pop-up pass preview with live QR code for ticket verification at temple entry.
* 🎟️ **Token Quota Manager**: Edit daily token slot quota for any temple with fast adjustment pills (`+50`, `+100`, `+250`, `+500`, `-50`).
* 🛕 **Temple Management**: Add, edit, or delete temples with local device image file uploads or custom image URLs.
* 💬 **Support Request Desk**: Review devotee contact requests and toggle ticket resolution status (`PENDING` / `RESOLVED`).

---

## 🛠️ Tech Stack

### Frontend:
* **Framework**: React.js 18 (Vite)
* **Styling**: Tailwind CSS, Vanilla CSS
* **Icons**: Lucide React
* **Document & Pass Tools**: `jsPDF`, `html2canvas`, `qrcode.react`
* **HTTP Client & Toasts**: Axios, React Hot Toast

### Backend:
* **Runtime**: Node.js & Express.js
* **Database**: MongoDB & Mongoose ORM
* **Security & Auth**: JWT (JSON Web Tokens), Bcrypt.js, Helmet, CORS
* **Logging**: Morgan

---

## 📂 Project Structure

```
DarshanEase/
 ├── client/                  # React Frontend (Vite)
 │    ├── src/
 │    │    ├── components/    # Reusable UI components (Navbar, TempleCard, Loader)
 │    │    ├── context/       # AuthContext state management
 │    │    ├── pages/         # Application routes (Home, Temples, BookingPage, AdminDashboard, Profile, Contact)
 │    │    └── utils/         # Cross-device cloudStore sync engine
 ├── server/                  # Node.js/Express Backend
 │    ├── controllers/        # Request handlers (authController, templeController, bookingController)
 │    ├── middleware/         # Auth & Admin route protectors
 │    ├── models/             # Mongoose schemas (User, Temple, Booking)
 │    ├── routes/             # Express API routes
 │    └── utils/              # MemoryStore fail-safe fallback database
 └── README.md
```

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* [MongoDB](https://www.mongodb.com/) installed locally or a MongoDB Atlas connection URI

---

### 1️⃣ Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Environment Configuration:
   A `.env` file is provided. Adjust settings if needed:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/darshanease
   JWT_SECRET=darshanease_super_secret_jwt_key_2026
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`.

---

### 2️⃣ Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm run dev
   ```
   The application will run locally on `http://localhost:5173`.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
