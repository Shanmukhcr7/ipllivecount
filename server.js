const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let viewers = 0;

io.on("connection", (socket) => {
    viewers++;
    io.emit("updateViewerCount", viewers);
    console.log(`User connected. Current viewers: ${viewers}`);

    socket.on("disconnect", () => {
        viewers--;
        io.emit("updateViewerCount", viewers);
        console.log(`User disconnected. Current viewers: ${viewers}`);
    });
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Optional: Serve the index.html on the root path
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
