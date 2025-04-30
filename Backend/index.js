import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
mongoose.connect(process.env.MONGO_ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database Connected..."));

// Allow all  origins
// app.use(cors());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  credentials: true
}));


// const allowedLinks = [
//   "httklfjslf",
//   "physicswallah.com"
//   "localhost"
// ]

// app.use(cors({
// origin : allowedLinks;
// }))

app.get('/ping', (req, res) => {
  res.json({ message: "pong" });
});

app.use(express.json());
app.use(UserRoute);

app.listen(5000, () => console.log("Server up and running..."));
