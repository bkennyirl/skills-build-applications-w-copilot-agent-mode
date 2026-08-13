"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMemberToTeam = exports.createTeam = exports.listTeams = void 0;
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
const listTeams = async (_req, res, next) => {
    try {
        const teams = await Team_1.Team.find().populate('members', 'name email grade').sort({ createdAt: -1 });
        res.json(teams);
    }
    catch (error) {
        next(error);
    }
};
exports.listTeams = listTeams;
const createTeam = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const team = await Team_1.Team.create({ name, description, members: [] });
        res.status(201).json(team);
    }
    catch (error) {
        next(error);
    }
};
exports.createTeam = createTeam;
const addMemberToTeam = async (req, res, next) => {
    try {
        const { teamId, userId } = req.params;
        const [team, user] = await Promise.all([Team_1.Team.findById(teamId), User_1.User.findById(userId)]);
        if (!team || !user) {
            res.status(404).json({ message: 'Team or user not found' });
            return;
        }
        if (!team.members.some((memberId) => memberId.equals(user._id))) {
            team.members.push(user._id);
        }
        user.team = team._id;
        await Promise.all([team.save(), user.save()]);
        res.json(team);
    }
    catch (error) {
        next(error);
    }
};
exports.addMemberToTeam = addMemberToTeam;
//# sourceMappingURL=teamController.js.map