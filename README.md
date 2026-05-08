# ♛ Chess — Online Multiplayer

Play chess online with your partner on different devices!

---

## How to Run Locally

### Step 1 — Install dependencies
Make sure you have Node.js installed (https://nodejs.org), then run:

```
npm install
```

### Step 2 — Start the server
```
npm start
```

### Step 3 — Open the game
Open your browser and go to: http://localhost:3000

---

## How to Play

1. **Player 1** opens the game and clicks **"Create Room"** — a 4-letter room code appears
2. **Player 2** opens the game on their device and clicks **"Join Room"**, then types the room code
3. The game starts automatically — Player 1 gets White, Player 2 gets Black
4. Click a piece to select it (valid moves glow), then click a square to move

---

## Deploy Online (So You Can Play From Different Devices)

### Option A — Render.com (Free, Recommended)

1. Create a free account at https://render.com
2. Push this folder to a GitHub repo
3. On Render, click "New Web Service" and connect your repo
4. Set:
   - **Build command:** `npm install`
   - **Start command:** `npm start`
5. Deploy! You'll get a URL like `https://my-chess.onrender.com`
6. Share that URL with your partner and use the same room code

### Option B — Railway.app (Also Free)

1. Go to https://railway.app and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repo and it auto-detects Node.js
4. Done! Railway gives you a public URL instantly

---

## Project Structure

```
chess-game/
├── server.js        ← Node.js + Socket.io backend
├── package.json     ← Project config & dependencies
├── README.md        ← This file
└── public/
    └── index.html   ← The entire game (HTML + CSS + JS)
```

---

## Features

- Real-time multiplayer via WebSockets (Socket.io)
- Full chess rules: castling, en passant, pawn promotion, check, checkmate, stalemate
- Board flips for Black player
- Move history log
- Visual highlights: selected piece, valid moves, last move, check
- Room code system — share a 4-letter code to connect
- Works on mobile and desktop

---

Made with ❤️ using Node.js + Socket.io
