import { Types } from 'mongoose';
export interface IUser {
    name: string;
    email: string;
    grade?: string;
    team?: Types.ObjectId;
    totalPoints: number;
}
export declare const User: import("mongoose").Model<IUser, {}, {}, {}, import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
//# sourceMappingURL=User.d.ts.map