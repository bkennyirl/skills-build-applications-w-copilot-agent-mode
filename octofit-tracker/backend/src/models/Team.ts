import { Schema, Types, model } from 'mongoose';

export interface ITeam {
  name: string;
  description?: string;
  members: Types.ObjectId[];
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

export const Team = model<ITeam>('Team', teamSchema);