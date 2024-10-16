import { Schema, model } from "mongoose";

const waterSchema = new Schema({

    waterVolume: {
        type: Number,
        required: true,
    },
    dailyNorm: {
        type: Number,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
}, { versionKey: false, timestamps: true });

const WaterCollection = model("water", waterSchema);

export default WaterCollection;
