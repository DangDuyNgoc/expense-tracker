import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from "colors";
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import userRoute from './routes/userRoute.js';
import incomeRoute from './routes/incomeRoute.js';
import expenseRoute from './routes/expenseRoute.js';
import dashboardRoute from './routes/dashboardRoute.js';

const app = express();

dotenv.config();

connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("API is running...");
})

const PORT = process.env.PORT || 8080;

app.use("/api/user", userRoute);
app.use("/api/income", incomeRoute);
app.use("/api/expense", expenseRoute);
app.use("/api/dashboard", dashboardRoute);

app.listen(PORT, () => {
    console.log(
        `Server Started on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
            .white,
    );
})

