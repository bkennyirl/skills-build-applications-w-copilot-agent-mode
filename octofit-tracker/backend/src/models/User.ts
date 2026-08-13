import { Schema, Types, model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  grade?: string;
  team?: Types.ObjectId;
  totalPoints: number;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    grade: { type: String, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    totalPoints: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);