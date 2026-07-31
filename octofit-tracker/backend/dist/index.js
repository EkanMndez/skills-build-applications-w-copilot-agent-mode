import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import './config/database.js';
import { Activity } from './models/Activity.js';
import { LeaderboardEntry } from './models/LeaderboardEntry.js';
import { Team } from './models/Team.js';
import { User } from './models/User.js';
import { Workout } from './models/Workout.js';
dotenv.config();
const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.locals.baseUrl = baseUrl;
app.use(cors());
app.use(express.json());
app.get('/api/health', async (_req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({
        status: 'ok',
        service: 'octofit-tracker-backend',
        baseUrl,
        database: dbStatus,
    });
});
app.get('/api/users/', async (_req, res) => {
    const users = await User.find().lean();
    res.json(users);
});
app.post('/api/users/', async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await Team.find().lean();
    res.json(teams);
});
app.post('/api/teams/', async (req, res) => {
    const team = await Team.create(req.body);
    res.status(201).json(team);
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await Activity.find().populate('userId').lean();
    res.json(activities);
});
app.post('/api/activities/', async (req, res) => {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await LeaderboardEntry.find().populate('userId').lean();
    res.json(leaderboard);
});
app.post('/api/leaderboard/', async (req, res) => {
    const entry = await LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await Workout.find().lean();
    res.json(workouts);
});
app.post('/api/workouts/', async (req, res) => {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
});
app.listen(port, () => {
    console.log(`OctoFit Tracker backend listening on port ${port}`);
    console.log(`Codespaces-aware base URL: ${baseUrl}`);
});
