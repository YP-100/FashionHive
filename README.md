# 👗 Fashion Hive – Full Stack E-Commerce Platform

**Fashion Hive** is a modern, responsive e-commerce web application built using the **MERN stack**. It supports dynamic browsing, secure payments, admin controls, and user interactions — all powered by JavaScript (99%+), including **Redux** for global state management and **Razorpay** for seamless payment integration.

---

## ## 🖼️ Project Screenshots , Overview & Presentation

🎥 [**Project Presentation (PPT)**](./ppts) – Contains detailed workflow, system diagrams, tech stack, and screenshots.

---

## 🚀 Features

### 🧍 User-Facing Features
- ✅ Browse fashion products by category and subcategory
- 🔍 Search, sort, and filter items
- 🛒 Add items to cart, register/login to place orders
- 💳 Razorpay-powered secure checkout
- 📦 Track order status
- ⭐ Rate & review purchased products
- 🗣️ Submit feedback to the admin

### 🛠️ Admin Features
- 📊 Admin dashboard with metrics (products, sales, users, orders)
- ➕ Add/edit/delete products
- 👤 Manage user roles (Customer/Admin)
- 🔄 Update order statuses
- 🗃️ View and act on customer feedback

---

## 🧱 Tech Stack

| Layer         | Technology                                 |
|---------------|--------------------------------------------|
| Frontend      | React.js, Tailwind CSS                     |
| State Mgmt    | Redux Toolkit                              |
| Backend       | Node.js, Express.js                        |
| Database      | MongoDB (Mongoose ORM)                     |
| Auth          | JWT, bcrypt                                |
| Payments      | Razorpay                                   |
| API Testing   | Postman, Axios                             |
| Deployment    | (Optional) Vercel / Render / MongoDB Atlas |

---

## 📂 Folder Structure

```bash
/
├── client/                # React frontend
│   ├── pages/             # UI pages (Home, Cart, Product, Admin)
│   ├── components/        # Reusable UI components
│   ├── redux/             # Redux store, slices, and actions
│   └── App.js             # Main entry point

├── server/                # Node + Express backend
│   ├── controllers/       # Business logic
│   ├── routes/            # API endpoints
│   ├── models/            # Mongoose schemas
│   ├── config/            # Razorpay keys, DB connection
│   ├── middleware/        # Auth, error handling
│   └── server.js          # Main server file
