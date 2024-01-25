import http from "http";
import app from "./app";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config({ path: ".env" });
const port = process.env.PORT;

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: `${process.env.CORS_ORIGIN}/anonChat/go`,
		methods: ["GET", "POST"],
		credentials: true,
	},
});

io.on("connection", (socket) => {
	console.log("user connected");
	console.log("socket-id", socket.id);
	socket.emit("welcome", `welcome to chat`);
	socket.broadcast.emit("welcome", ` ${socket.id} entered to chat`);

	socket.on("message", ({ message, room, userId }) => {
		console.log({ message, room, userId });
		console.log("room", room);
		socket.to(room).emit("receive-message", { message, userId });
	});

	socket.on("join-room", (room) => {
		socket.join(room);
	});

	socket.on("disconnect", () => {
		console.log(` ${socket.id} user disconnected`);
	});
});

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
