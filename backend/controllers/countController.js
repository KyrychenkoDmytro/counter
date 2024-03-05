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
    const { action } = req.params;

    if (action !== 'increase' && action !== 'decrease') {
        return res.status(400).json({ message: 'Invalid action' });
    }

    try {
        const countDoc = await CountModel.findOne({ id: '1q2w3e' });
        if (!countDoc) {
            return res.status(404).json({ message: 'Count document not found' });
        }

        if (action === 'increase') {
            countDoc.count++;
        } else if (action === 'decrease') {
            if (countDoc.count === 0) {
                return res.status(400).json({ message: 'Count cannot be less than zero' });
            }
            countDoc.count--;
        }

        countDoc.updatedAt = new Date();
        await countDoc.save();

        return res.json({ count: countDoc.count, updatedAt: countDoc.updatedAt });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update count', error });
    }
};
