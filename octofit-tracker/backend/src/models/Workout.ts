import { Schema, model } from 'mongoose';

export type WorkoutLevel = 'beginner' | 'intermediate' | 'advanced';

export interface IWorkout {
  title: string;
  level: WorkoutLevel;
  category: string;
  durationMinutes: number;
  description: string;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true, trim: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    category: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 5 },
    description: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export const Workout = model<IWorkout>('Workout', workoutSchema);