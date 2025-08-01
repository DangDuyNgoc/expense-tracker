import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    icon: {
        type: String,
    },
    source: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamp: true })

const incomeModel = mongoose.model("income", incomeSchema);
export default incomeModel;