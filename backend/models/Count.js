import mongoose from "mongoose";

const CountSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true,
    },
    id: {
        type: String,
        require: true
    }
});

export default mongoose.model('Count', CountSchema);