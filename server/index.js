import http from "http";
import app from "./app.js";
import { PORT } from "./config.js";
import dotenv from "dotenv";

const port = process.env.PORT || PORT;
// dotenv.config();

const server = http.createServer(app);
server.listen(port, () => console.log("Listening on port: ", port));