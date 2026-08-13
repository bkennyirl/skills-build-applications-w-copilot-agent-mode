"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });
exports.Team = (0, mongoose_1.model)('Team', teamSchema);
//# sourceMappingURL=Team.js.map