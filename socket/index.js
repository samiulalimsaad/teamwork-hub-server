const http = require("http");
const socketIo = require("socket.io");

function connectSocketIO(app) {
    const server = http.createServer(app);
    const io = socketIo(server, {
        cors: {
            origin: ["http://localhost:5173"],
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true,
            optionSuccessStatus: 200,
        },
    });
    io.on("connection", (socket) => {
        console.info("New client connected");

        socket.on("editDocument", (data) => {
            console.info("...editDocument...", data);
            socket.broadcast.emit("documentEdited", data);
        });

        socket.on("joinDocument", (data) => {
            console.info("...joinDocument...", data);
            socket.join(`document-${data.documentId}`);
        });

        socket.on("leaveDocument", (data) => {
            console.info("...leaveDocument...", data);
            socket.leave(`document-${data.documentId}`);
        });

        socket.on("newFeedback", (data) => {
            console.info("...newFeedback...", data);
            socket.broadcast.emit("feedbackReceived", data);
        });

        socket.on("sendMessage", (message) => {
            io.emit("receiveMessage", message);
        });

        socket.on("disconnect", () => {
            console.info("Client disconnected");
        });
    });

    return server;
}
module.exports = connectSocketIO;
