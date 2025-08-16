import express from 'express';
import cors from 'cors';
import ConnectedDB from './infrastructure/db.js';
import dotenv from "dotenv";
import usersRouter from './api/user.js';
import placesRouter from './api/places.js';
import bookingRouter from './api/booking.js';
import globalErrorHandlingMiddlware from './middleware/global-error-hadling.js';
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
ConnectedDB();

app.use("/api/users",usersRouter);
app.use("/api/places",placesRouter);
app.use(globalErrorHandlingMiddlware);
app.use("/api/booking",bookingRouter);

const PORT = 5000;
app.listen(5000,
    console.log(`Server is running on port ${PORT}..`)
);

