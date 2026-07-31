import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true },
    level: { type: String, required: true },
    duration: { type: Number, required: true },
    focus: { type: String, default: 'general fitness' },
}, { timestamps: true });
export const Workout = model('Workout', workoutSchema, 'workouts');
