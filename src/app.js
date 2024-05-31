import express from "express";
import router from "./router.js";
import cors from "cors";
import { errorGenericHandler } from "./middleware/errorMiddleware.js";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorGenericHandler);

export default app;
