"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teamController_1 = require("../controllers/teamController");
const teamRouter = (0, express_1.Router)();
teamRouter.get('/', teamController_1.listTeams);
teamRouter.post('/', teamController_1.createTeam);
teamRouter.post('/:teamId/members/:userId', teamController_1.addMemberToTeam);
exports.default = teamRouter;
//# sourceMappingURL=teamRoutes.js.map