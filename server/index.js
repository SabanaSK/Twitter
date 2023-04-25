import http from "http";
import app from "./app.js";
import { PORT } from "./config.js";

const port = process.env.PORT || PORT;

const server = http.createServer(app);
server.listen(port, () => console.log("Listening on port: ", port));