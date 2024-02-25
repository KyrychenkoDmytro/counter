import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import CountModel from './models/Count.js';
import dotenv from 'dotenv';
dotenv.config();

// 'mongodb+srv://admin:1q2w3e@cluster0.estzqnq.mongodb.net/casino?retryWrites=true&w=majority'
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get('/counts', async (req, res) => {
    try {
        const count = await CountModel.find();
        if (!count.length) {
            const updatedAt = new Date();
            const doc = new CountModel({ "count": 0, "id": "1q2w3e", updatedAt });
            const zeroCount = await doc.save();
            return res.json([zeroCount]);
        }
        return res.json(count);

    } catch (err) {
        return res.status(500).json({ message: 'Connection error.' });
    }
})

app.patch('/counts', async (req, res) => {
    try {
        const newCount = await CountModel.updateOne({ id: req.body.id }, { $set: req.body });
        if (newCount.modifiedCount === 1) {
            const count = await CountModel.findOne({ id: req.body.id });
            return res.json(count);
        } else {
            return res.status(404).json({ message: 'Failed to add counttt' });
        }

    } catch (error) {
        return res.json({
            message: 'failed to add count',
            error,
        })
    }
})

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server running on port ${PORT}`)
});