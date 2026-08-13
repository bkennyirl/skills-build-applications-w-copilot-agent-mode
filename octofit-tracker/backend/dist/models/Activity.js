"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['running', 'walking', 'strength', 'cycling'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    points: { type: Number, required: true, min: 0 },
    performedAt: { type: Date, default: Date.now }
}, { timestamps: true });
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
//# sourceMappingURL=Activity.js.map