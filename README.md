# 🍲 MealBridge

![React](https://img.shields.io/badge/Frontend-React-blue) ![Node](https://img.shields.io/badge/Backend-Node.js-green) ![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen) ![Socket.io](https://img.shields.io/badge/Real--Time-Socket.io-black) ![License](https://img.shields.io/badge/License-MIT-yellow)
**Connecting food surplus to those in need**

A real-time MERN platform that links **donors**, **NGOs**, and **delivery partners** to reduce food waste efficiently.

**Live:** [https://your-vercel-link.app](https://your-vercel-link.app)
**API:** [https://your-render-link.onrender.com](https://your-render-link.onrender.com)

---

## 🌟 Key Features

* **Real‑Time Updates** — Socket.io (Pending → Accepted → Picked Up → Delivered)
* **Live Map** — Leaflet + React‑Leaflet for pickup marking and navigation
* **Role‑Based Dashboards**

  * **Donor:** Add food & pickup time
  * **NGO:** Approve requests & assign delivery partners
  * **Delivery Partner:** View tasks & update delivery status
* **Responsive UI** — Works smoothly on mobile & desktop

---

## 🛠️ Tech Stack

| Layer          | Technologies                                        |
| -------------- | --------------------------------------------------- |
| **Frontend**   | React (Vite), CSS3, React‑Leaflet, Socket.io-client |
| **Backend**    | Node.js, Express.js, Socket.io                      |
| **Database**   | MongoDB Atlas                                       |
| **Deployment** | Vercel, Render                                      |

---

## ⚙️ Quick Start

```bash
# clone
git clone https://github.com/your-username/MealBridge.git
cd MealBridge

# backend
cd server
npm install
# create .env with MONGO_URI
npm run dev

# frontend (new terminal)
cd ../client
npm install
npm run dev

# open
# http://localhost:5173
```
