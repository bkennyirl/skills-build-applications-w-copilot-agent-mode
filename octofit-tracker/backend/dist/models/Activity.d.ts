import { Types } from 'mongoose';
export type ActivityType = 'running' | 'walking' | 'strength' | 'cycling';
export interface IActivity {
    user: Types.ObjectId;
    type: ActivityType;
    durationMinutes: number;
    caloriesBurned: number;
    points: number;
    performedAt: Date;
}
export declare const Activity: import("mongoose").Model<IActivity, {}, {}, {}, import("mongoose").Document<unknown, {}, IActivity, {}, import("mongoose").DefaultSchemaOptions> & IActivity & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IActivity>;
//# sourceMappingURL=Activity.d.ts.map