# AURA

## 🌌 What is AURA?

**AURA** is a Gen-Z social media platform focused on **vibes, moods, and expression** rather than likes or followers.

Traditional social media creates pressure through visible metrics like followers, likes, and views. AURA removes those elements and replaces them with **Aura ranks and expressive interactions**.

> Expression over validation.
> Vibes over numbers.
> Fun over perfection.

---

# ⚡ How AURA Works

1. Users create posts (photo, video, or text)
2. Posts receive **Aura**
3. Aura increases the user's **Aura Rank**
4. Higher ranks unlock **visual effects and visibility**

---

# 💬 Interactions

| Interaction | Meaning        |
| ----------- | -------------- |
| Aura        | Like a post    |
| Sync Aura   | Follow someone |
| Yap         | Comment        |
| Transmit    | Share          |
| Spilt       | Create a post  |

---

# 🏗 System Architecture

```
                ┌─────────────────────┐
                │      Frontend       │
                │       React         │
                │  (UI + State)       │
                └─────────▲───────────┘
                          │ API Calls
                          │
                ┌─────────┴───────────┐
                │       Backend       │
                │      Node.js        │
                │     Express API     │
                └─────────▲───────────┘
                          │
                          │ ORM / Queries
                          │
                ┌─────────┴───────────┐
                │      Database       │
                │     PostgreSQL      │
                └─────────▲───────────┘
                          │
                          │ File Storage
                          │
                ┌─────────┴───────────┐
                │    Image Storage    │
                │ (Cloud / CDN / S3)  │
                └─────────────────────┘
```

### Architecture Flow

1. User interacts with **React frontend**
2. Requests go to **Node.js Express API**
3. Backend processes:

   * posts
   * comments
   * aura interactions
   * rank calculations
4. Data stored in **PostgreSQL**
5. Media stored in **cloud storage**

---

# 🛠 Tech Stack

Frontend

* React
* TailwindCSS
* TypeScript

Backend

* Node.js
* Express.js

Database

* PostgreSQL

Other

* REST API
* Cloud image storage

---

# ⚙ Installation Guide

### Clone the repository

```bash
git clone https://github.com/yourusername/aura.git
cd aura
```

---

### Install dependencies

Frontend

```bash
cd frontend
npm install
```

Backend

```bash
cd backend
npm install
```

---

###  Setup environment variables

Create a `.env` file inside **backend**

Example:

```
PORT=5000
DATABASE_URL=your_postgres_connection
JWT_SECRET=your_secret
```

---

###  Run the backend

```bash
npm run dev
```

Server starts at:

```
http://localhost:5000
```

---

### 5️Run the frontend

```bash
cd frontend
npm run dev
```

Frontend starts at:

```
http://localhost:5173
```

---

# Future Features

* Aura-based recommendation algorithm
* Real-time interactions
* Rank-based feed
* Creator aura boosts
* Mood-based discovery

---

#  Philosophy

AURA is designed to remove the toxic parts of social media and focus on **authentic expression and internet culture.**

No follower counts.
No like chasing.
Just **vibes.**
