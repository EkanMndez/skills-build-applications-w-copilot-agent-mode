import mongoose from 'mongoose';

import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      {
        name: 'Avery Cole',
        email: 'avery.cole@octofit.app',
        goal: 'Run a 5K race',
        weeklyMinutes: 180,
      },
      {
        name: 'Jordan Lee',
        email: 'jordan.lee@octofit.app',
        goal: 'Build core strength',
        weeklyMinutes: 210,
      },
      {
        name: 'Taylor Brooks',
        email: 'taylor.brooks@octofit.app',
        goal: 'Improve mobility',
        weeklyMinutes: 120,
      },
    ]);

    await Team.insertMany([
      {
        name: 'Trail Blazers',
        members: 5,
        focus: 'Endurance',
        captain: 'Avery Cole',
      },
      {
        name: 'Pulse Crew',
        members: 4,
        focus: 'Strength',
        captain: 'Jordan Lee',
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'run',
        duration: 35,
        date: '2026-07-31',
      },
      {
        userId: users[1]._id,
        type: 'lift',
        duration: 45,
        date: '2026-07-31',
      },
      {
        userId: users[2]._id,
        type: 'mobility',
        duration: 20,
        date: '2026-07-31',
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        userId: users[0]._id,
        score: 980,
        rank: 1,
      },
      {
        userId: users[1]._id,
        score: 935,
        rank: 2,
      },
      {
        userId: users[2]._id,
        score: 892,
        rank: 3,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'HIIT Sprint',
        level: 'intermediate',
        duration: 20,
        focus: 'cardio',
      },
      {
        title: 'Mobility Reset',
        level: 'beginner',
        duration: 15,
        focus: 'recovery',
      },
      {
        title: 'Power Circuit',
        level: 'advanced',
        duration: 30,
        focus: 'strength',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
