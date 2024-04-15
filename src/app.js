import express from "express";
import router from "./router.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

export default app;
