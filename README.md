# 💳 Digital Wallet API

A secure and modular digital wallet system backend built with **Express.js**, **TypeScript**, and **MongoDB**. Supports core wallet operations like registration, balance management, money transfers, and includes role-based access control.

---

## 🚀 Features

- 🔐 **Authentication** using JWT
- 🎭 **Role-based authorization** (admin, user, agent)
- 🏦 **Wallet operations**: add money, withdraw, send
- 🔄 **Transaction logs** with atomic updates
- 🧰 **Zod validation** for clean and secure request handling
- 🗃️ **MongoDB** with Mongoose for data persistence
- ⚙️ **Scalable folder structure**

---

## 📁 Folder Structure

src/
│
├── app.ts # Main Express app
├── server.ts # Entry point
├── config/ # Environment configs
├── modules/ # Features: auth, user, wallet
│ ├── auth/ # Auth logic
│ ├── user/ # User management
│ └── wallet/ # Wallet operations
├── middlewares/ # Error handlers, auth, etc.
├── utils/ # Helpers and constants
└── routes/ # Centralized route management


---

## 🧪 API Endpoints

### ✅ Auth

- `POST /api/v1/auth/register` — Register a new user
- `POST /api/v1/auth/login` — Log in and receive token

### 💼 Wallet

- `GET /api/v1/wallet/balance` — Check wallet balance
- `POST /api/v1/wallet/add-money` — Add funds
- `POST /api/v1/wallet/send-money` — Send money to another wallet
- `POST /api/v1/wallet/withdraw` — Withdraw funds

---

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/digital-wallet-api.git
cd digital-wallet-api

# Install dependencies
npm install


⚙️ Environment Variables
Create a .env file from .env.example:

🏃 Run the Project

# Start in development mode
npm run dev

# Build TypeScript
npm run build

# Run built project
npm start


🧩 Tech Stack
Backend: Node.js, Express.js

Language: TypeScript

Database: MongoDB (via Mongoose)

Validation: Zod

Authentication: JWT

Dev Tools: ts-node-dev, dotenv

📜 Scripts

npm run dev        # Run in development mode
npm run build      # Compile TypeScript to JS
npm start          # Run compiled project


🔒 Security
Passwords hashed using bcrypt

JWT tokens for stateless authentication

Role-based access control via middleware

🪪 License
MIT © [Mahabub-Alam]