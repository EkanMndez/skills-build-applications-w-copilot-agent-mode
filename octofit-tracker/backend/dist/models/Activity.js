import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: String, required: true },
}, { timestamps: true });
export const Activity = model('Activity', activitySchema, 'activities');
