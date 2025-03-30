const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let viewers = 0;

io.on("connection", (socket) => {
    viewers++;
    io.emit("updateViewerCount", viewers);

    socket.on("disconnect", () => {
        viewers--;
        io.emit("updateViewerCount", viewers);
    });
});

app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
