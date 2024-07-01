const http = require("http");
const socketIo = require("socket.io");

function connectSocketIO(app) {
    const server = http.createServer(app);
    const io = socketIo(server, {
        cors: {
            origin: [
                "http://localhost:4173",
                "http://localhost:5173",
                "https://teamwork-hub-client.vercel.app",
            ],
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true,
            optionSuccessStatus: 200,
        },
        transports: ["websocket", "polling"],
    });
    io.on("connection", (socket) => {
        console.info("New client connected");

        socket.on("editDocument", (data) => {
            console.info("...editDocument...", data);
            socket.broadcast.emit(`documentEdited-${data._id}`, data);
        });
        socket.on("selection-change", (data) => {
            console.info("...selection-change...", data);
            socket.broadcast.emit("cursor-move", data);
        });

        socket.on("joinDocument", (data) => {
            console.info("...joinDocument...", data);
            socket.broadcast.emit(`document-${data.documentId}`, data);
        });

        socket.on("leaveDocument", (data) => {
            console.info("...leaveDocument...", data);
            socket.leave(`document-${data.documentId}`);
        });

        socket.on("newFeedback", (data) => {
            console.info("...newFeedback...", data);
            socket.broadcast.emit(`feedbackReceived-${data._id}`, data);
        });
        socket.on("newMessage", (data) => {
            console.info("...newMessage...", data);
            socket.broadcast.emit(`messageReceived-${data._id}`, data);
        });

        socket.on("editorOption", (data) => {
            console.info("...editorOption...", data);
            socket.broadcast.emit(`editorOption-${data._id}`, data);
        });

        socket.on("disconnect", () => {
            console.info("Client disconnected");
        });
    });

    return server;
}
module.exports = connectSocketIO;
