# AI Proctored Examination System

A web-based MCQ examination platform integrated with AI-based proctoring using face detection and object detection.

## Features

- User Registration & Login
- Student/Admin Authentication
- MCQ-Based Online Examination
- Timer-Based Auto Submission
- AI Face Detection Monitoring
- Mobile Phone Detection
- Fullscreen Monitoring
- Tab Switching Detection
- Automatic Malpractice Detection
- Admin Dashboard for Adding Questions
- Result Storage using MongoDB
  
## Tech Stack
### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### AI / Proctoring
- face-api.js
- TensorFlow.js
- coco-ssd

  ## Project Structure
bash
Ai_exam
│
├── client
│
├── server
│
└── README.md
 ## Setup ### 

## Backend Setup
bash
cd server
npm install
npm start

Backend runs on:
bash
http://localhost:5000

## Frontend Setup Open another terminal:
bash
cd client
npm install
npm run dev

Frontend runs on:
bash
http://localhost:5173

## Environment Variables Create a .env file inside the server folder.
env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

## Environment Variables

Create a `.env` file inside the `server` folder.

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## AI Monitoring Features

- Face Detection
- Multiple Face Detection
- No Face Detection
- Mobile Phone Detection
- Auto Submission on Malpractice
- Fullscreen Exit Detection
- Tab Switching Detection

---

## Developed By

Charanya Sree
