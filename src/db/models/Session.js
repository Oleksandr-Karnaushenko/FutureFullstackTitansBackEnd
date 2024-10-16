import { Schema, model } from "mongoose";

const sessionSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    accessTokenValidUntil: {
        type: Date,
        required: true
    },
    refreshTokenValidUntil: {
        type: Date,
        required: true
    },
}, { timestamps: true, versionKey: false });

const SessionCollection = model("session", sessionSchema);

export default SessionCollection;