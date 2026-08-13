export type WorkoutLevel = 'beginner' | 'intermediate' | 'advanced';
export interface IWorkout {
    title: string;
    level: WorkoutLevel;
    category: string;
    durationMinutes: number;
    description: string;
}
export declare const Workout: import("mongoose").Model<IWorkout, {}, {}, {}, import("mongoose").Document<unknown, {}, IWorkout, {}, import("mongoose").DefaultSchemaOptions> & IWorkout & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IWorkout>;
//# sourceMappingURL=Workout.d.ts.map