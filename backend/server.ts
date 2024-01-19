import http from "http";
import app from "./app";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config({ path: ".env" });
const port = process.env.PORT;

const server = http.createServer(app);
const io = new Server(server, {});

io.on("connection", (socket) => {
	console.log("user connected");
	console.log("socket id", socket.id);
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
