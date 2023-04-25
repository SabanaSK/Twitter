import dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;

export { DB_URL, PORT };