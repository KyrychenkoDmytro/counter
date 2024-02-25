import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import countRoutes from './routes/countRoutes.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use('/counts', countRoutes);

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server running on port ${PORT}`);
});
