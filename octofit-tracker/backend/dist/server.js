"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
const PORT = process.env.PORT || 8000;
// Start server
app_1.default.listen(PORT, () => {
    const codespaceName = process.env.CODESPACE_NAME;
    const baseUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${PORT}`;
    console.log(`Server is running on ${baseUrl}`);
    console.log(`Database connection: ${database_1.default.readyState === 1 ? 'Connected' : 'Connecting...'}`);
});
exports.default = app_1.default;
//# sourceMappingURL=server.js.map