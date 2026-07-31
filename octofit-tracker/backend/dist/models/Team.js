import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    members: { type: Number, default: 0 },
    focus: { type: String, required: true },
    captain: { type: String, default: '' },
}, { timestamps: true });
export const Team = model('Team', teamSchema, 'teams');
