const http = require("http");
const socketIo = require("socket.io");

function connectSocketIO(app) {
    const server = http.createServer(app);
    const io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
        console.log("New client connected");

        socket.on("editDocument", (data) => {
            console.log("...editDocument...", data);
            socket.broadcast.emit("documentEdited", data);
        });

        socket.on("joinDocument", (data) => {
            console.log("...joinDocument...", data);
            socket.join(`${data.projectId}-${data.documentId}`);
        });

        socket.on("leaveDocument", (data) => {
            console.log("...leaveDocument...", data);
            socket.leave(`${data.projectId}-${data.documentId}`);
        });

        socket.on("newFeedback", (data) => {
            console.log("...newFeedback...", data);
            io.to(`${data.projectId}-${data.documentId}`).emit(
                "feedbackReceived",
                data
            );
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });

    return server;
}
module.exports = connectSocketIO;
