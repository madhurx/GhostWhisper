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

const users = <any>[{}];
io.on("connection", (socket) => {
	console.log("user connected");
	console.log("socket-id", socket.id);

	socket.on("message", ({ message, room, userId }) => {
		const data = { message, userId };
		io.to(room).emit("receiveMessage", data);
	});

	socket.on("join-room", ({ roomName, userName }) => {
		socket.join(roomName);
		users[socket.id] = userName;
		socket.emit("welcome", `welcome to chat`);
		socket.broadcast.to(roomName).emit(
			"welcome",
			` ${users[socket.id].split("-")[0]} entered chat.`,
		);
	});

	socket.on("disconnect", () => {
		console.log(` ${socket.id} user disconnected`);
	});
});

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
