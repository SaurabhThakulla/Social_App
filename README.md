# AURA

## Overview

AURA is a social platform designed around expression rather than validation.  
It removes traditional engagement metrics (likes, followers, views) and replaces them with a system centered on user vibe, interaction quality, and presence.

The platform emphasizes:
- Expression over performance  
- Interaction over metrics  
- Identity over popularity  

---

## Core Concept

Instead of tracking visible numbers, AURA introduces:

- Aura → engagement signal on posts  
- Aura Rank → dynamic representation of user presence  
- Unlockable UI states → visual progression based on activity  

This shifts the focus from competition to participation.

---

## Interaction Model

| Action      | Description              |
|------------|--------------------------|
| Aura       | React to a post          |
| Sync Aura  | Follow a user            |
| Yap        | Comment                  |
| Transmit   | Share content            |
| Split      | Create a post            |

---

## System Architecture

Frontend (React + TypeScript + Tailwind)
        │
        │ HTTP / REST API
        ▼
Backend (Node.js + Express)
        │
        │ ORM / Queries
        ▼
Database (PostgreSQL)
        │
        ▼
Cloud Storage (S3 / CDN)

---

## Flow

1. Client interacts with React UI  
2. Requests are sent to Express API  
3. Backend handles:
   - Posts
   - Interactions
   - Aura calculation
   - Ranking logic  
4. Data is persisted in PostgreSQL  
5. Media is stored in cloud storage  

---

## Tech Stack

Frontend:
- React
- TypeScript
- TailwindCSS

Backend:
- Node.js
- Express.js

Database:
- PostgreSQL

Infrastructure:
- REST API
- Cloud storage (S3 / CDN)

---

## Setup

### Clone

git clone https://github.com/yourusername/aura.git
cd aura

---

### Install Dependencies

cd frontend
npm install

cd ../backend
npm install

---

### Environment Variables

Create a `.env` file in /backend:

PORT=5000
DATABASE_URL=your_postgres_connection
JWT_SECRET=your_secret

---

### Run Backend

npm run dev

Server:
http://localhost:5000

---

### Run Frontend

cd frontend
npm run dev

Client:
http://localhost:5173

---

## Roadmap

- Aura-based recommendation system  
- Real-time interactions (WebSockets)  
- Rank-driven feed algorithm  
- Creator boost mechanics  
- Mood-based discovery engine  

---

## Design Principles

- No visible engagement metrics  
- Reduced social pressure  
- Lightweight, fast UI  
- Modular and scalable architecture  
