import CountModel from '../models/Count.js';

export const getCounts = async (req, res) => {
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
};

export const updateCount = async (req, res) => {
    if (req.body.count < 0) {
        return res.status(404).json({ message: 'Count cannot be less than zero' });
    }
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
};
