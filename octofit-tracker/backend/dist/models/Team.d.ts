import { Types } from 'mongoose';
export interface ITeam {
    name: string;
    description?: string;
    members: Types.ObjectId[];
}
export declare const Team: import("mongoose").Model<ITeam, {}, {}, {}, import("mongoose").Document<unknown, {}, ITeam, {}, import("mongoose").DefaultSchemaOptions> & ITeam & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, ITeam>;
//# sourceMappingURL=Team.d.ts.map