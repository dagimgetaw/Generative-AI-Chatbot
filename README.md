# Advance Generative AI Chatbot

This MERN Stack web application allows users to interact with the latest AI model, Gemini 1.5 Turbo, providing intelligent, generative conversations. It features a user-friendly interface for engaging with cutting-edge AI technology, enhancing communication and productivity effortlessly.

## Tech Stack

- **Frontend** - React
- **Backend** - Node.js with Express
- **AI Engine** - Google Gemini
- **Database** - MongoDB
- **Authentication** - Clerk
- **Deployment** - GitHub

## Features

### 1, Conversational AI

Users can interact with the AI chatbot, which generates intelligent responses and maintains the flow of conversation.

### 2, User Authentication

Only registered users can access the chatbot and their own chat history.

### 3, Real-time Interaction

Experience quick responses with a seamless user interface.

### 4, Responsive Design

Optimized for all screen sizes, ensuring a user-friendly experience.

### 5, Chat History Management

View past chat history for a personalized experience.

### 6, OAuth Integration

Includes Google Sign-In for easy and secure authentication.

### 7, Customizable Responses

Tailored conversations to meet diverse user needs.

### 8, Secure API Communication

Ensures data privacy through encrypted API interactions.

### 9, Developer-Friendly

Designed to be easily extendable for additional AI features.

### 10, Data Storage

Secure storage of user data and chat history for convenience and privacy.

## Installation Guide

Follow these steps to set up the Generative AI Chatbot

### Steps to Install

1.  **Clone the Repository**:
    Open your terminal and run the following command to clone the repository

    `https://github.com/dagimgetaw/Generative-AI-Chatbot.git`

2.  **Go to the backend**:

    `cd backend`

    `npm install express dotenv cors mongoose @google/generative-ai`

    To include development tools for api:

    `cd api/`

    `npm install --save-dev nodemon`

    ` node api.js`

    To include development tools for api:

    `cd server/`

    `npm install --save-dev nodemon`

    ` node server.js`

3.  **Go to the frontend**:
    Open your terminal and run the following command make sure it is in Generative-AI-Chatbot/ dir

    `cd frontend`

    `npm install @clerk/clerk-react react-icons react-router-dom axios`

    ` npm run dev`

## Directory Structure

```bash
Generative-AI-Chatbot /
├── backend/
    ├── api/
        ├── api.js
        ├── package.json
    ├── server/
        ├── models/
            ├── user.js
        ├── index.js
        ├── package.json
├── frontend/
    ├── public/
        ├──vite.svg
    ├── src/
        ├── asset/
        ├── components/
            ├── Body/
                ├── Body.jsx
                ├── Body.css
            ├── Header/
                ├── Header.jsx
                ├── Header.css
            ├── Join/
                ├── Login.jsx
                ├── Signup.jsx
                ├── Join.css
            ├── Main/
                ├── Main.jsx
                ├── Main.css
            ├── NotFound/
                ├── NotFound.jsx
                ├── NotFound.css
            ├── Sidebar/
                ├── Sidebar.jsx
                ├── Sidebar.css

        ├── context/
            ├── Context.jsx
        ├── App.jsx
        ├── AuthContext.jsx
        ├── index.css
        ├── main.jsx
        ├── package.json
        ├── table_img.jpg
        ├── table_pdf.pdf
    ├── index.html
    ├── package.json
├── README. md
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any inquiries or support, reach out to:

- **Developer** - Dagim Getaw
- **Email** - dagimgetaw27@example.com
- **GitHub** - https://github.com/dagimgetaw
