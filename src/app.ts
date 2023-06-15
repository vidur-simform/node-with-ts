//packages
import dotenv from'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";

//environmetal variable
const port = Number(process.env.PORT);
const mongodbUri = process.env.MONGODB_URI_LOCAL!;

import {todoRouter} from './routes/todo.router';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(cors());
app.use("/todo",todoRouter);

app.use(errorHandler);
(async () => {
    try {
        const result = await mongoose.connect(mongodbUri);
        console.log("Database connected...");
        app.listen(port, () => {
            console.log("Server started on port:", port);
        });
    }
    catch (err) {
        console.log(err);
    }
})();