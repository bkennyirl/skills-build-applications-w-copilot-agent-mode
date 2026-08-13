"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activityController_1 = require("../controllers/activityController");
const activityRouter = (0, express_1.Router)();
activityRouter.get('/', activityController_1.listActivities);
activityRouter.post('/', activityController_1.logActivity);
exports.default = activityRouter;
//# sourceMappingURL=activityRoutes.js.map