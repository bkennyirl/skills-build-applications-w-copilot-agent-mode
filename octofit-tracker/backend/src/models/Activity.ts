import { Schema, Types, model } from 'mongoose';

export type ActivityType = 'running' | 'walking' | 'strength' | 'cycling';

export interface IActivity {
  user: Types.ObjectId;
  type: ActivityType;
  durationMinutes: number;
  caloriesBurned: number;
  points: number;
  performedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['running', 'walking', 'strength', 'cycling'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    points: { type: Number, required: true, min: 0 },
    performedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const Activity = model<IActivity>('Activity', activitySchema);