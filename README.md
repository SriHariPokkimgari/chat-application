# Chat Application

A full-stack chat application built with a modular architecture featuring a modern JavaScript frontend and a Node.js backend. This application supports real-time messaging, user authentication, and persistent chat history.

## Features

### 1. Real-Time Chat
- Users can send and receive messages instantly.
- Messages are broadcast to all users in the chat room.

### 2. User Authentication
- Secure registration and login system.
- User sessions maintained for an authenticated chat experience.

### 3. Persistent Messaging
- All chat messages are stored in a database.
- Users joining the chat can view recent messages.

### 4. User Management
- Handles user joining/leaving events in real-time.

### 5. Modular Code Structure
- **Client (`client/`)**: React-based frontend for user interaction.
- **Server (`server/`)**: Node.js/Express backend managing authentication, messages, and user sessions.

---

## Project Structure

```
chat-application/
├── client/         # Frontend (React + Vite)
│   ├── src/
│   │   ├── chat/        # Chat-specific logic and components
│   │   ├── components/  # Reusable UI components
│   │   ├── App.jsx      # Main React application
│   │   └── ...          
│   ├── public/      # Static assets
│   ├── package.json
│   └── ...
├── server/         # Backend (Node.js + Express)
│   ├── routes/         # Express routes (e.g., authentication)
│   ├── models/         # Database models (users, messages, etc.)
│   ├── index.js        # App entry point
│   ├── package.json
│   └── ...
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (18.x or newer recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/SriHariPokkimgari/chat-application.git
    cd chat-application
    ```

2. **Install backend dependencies:**
    ```bash
    cd server
    npm install
    ```

3. **Install frontend dependencies:**
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

1. **Start the backend server:**
    ```bash
    cd server
    npm run dev
    ```

2. **Start the frontend development server:**
    ```bash
    cd ../client
    npm run dev
    ```

3. **Access the app:**
    - Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Main Components & Files

- `client/src/App.jsx`: Main React application entry.
- `client/src/chat/`: Contains chat logic and UI.
- `server/index.js`: Core Express server logic.
- `server/routes/authentication.js`: Handles user registration and login.
- `server/models/`: Contains database models for users and messages.

---

## How it Works

- **Users register/login** via the frontend, which communicates with the backend for authentication.
- **Authenticated users** are allowed to enter the chat room.
- **Messages sent** are saved in the database and broadcast to all connected clients.
- **Online users** are tracked and updated in real-time.

---

## Contributing

Pull requests are welcome! If you have suggestions for improvements or new features, feel free to open an issue or contribute directly.

---

## License

This project is licensed under the MIT License.
