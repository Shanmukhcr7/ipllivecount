const express = require("express");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// WebSocket Server
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const wss = new WebSocket.Server({ server });

let liveViewers = 0;

// Handle WebSocket connections
wss.on("connection", (ws) => {
    liveViewers++;
    console.log(`New connection! Viewers: ${liveViewers}`);

    // Send updated count to all clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(liveViewers);
        }
    });

    ws.on("close", () => {
        liveViewers--;
        console.log(`Viewer left! Viewers: ${liveViewers}`);
        
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(liveViewers);
            }
        });
    });
});
