# 📝 Notes Backend

This is a simple Express + MongoDB backend for a notes application. It supports user authentication and CRUD operations for personal notes, including tagging and filtering.

---

## 🚀 Features

- User registration & login (JWT-based auth with cookies)
- Notes CRUD: create, read, update, delete
- Validation using Yup
- Tags for notes (`work`, `personal`, `urgent`, `idea`, `todo`)
- Input & parameter validation middleware
- Cookie-based session handling
- Secure password hashing with bcrypt
- Centralized error handling

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT** for authentication
- **Yup** for validation
- **dotenv** for environment config

---

## 🔧 Installation

```bash
git clone https://github.com/your-username/notes-backend.git
# to install dependencies
npm install
# to run project
npm run dev
```
