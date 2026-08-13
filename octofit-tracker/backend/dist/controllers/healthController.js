"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealth = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const getHealth = (_req, res) => {
    const codespaceName = process.env.CODESPACE_NAME;
    const baseUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
    res.json({
        status: 'OK',
        message: 'OctoFit Tracker Backend is running',
        baseUrl,
        database: mongoose_1.default.connection.readyState === 1 ? 'Connected' : 'Connecting'
    });
};
exports.getHealth = getHealth;
//# sourceMappingURL=healthController.js.map