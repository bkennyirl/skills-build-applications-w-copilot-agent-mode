"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.Router)();
userRouter.get('/', userController_1.listUsers);
userRouter.post('/', userController_1.createUser);
userRouter.get('/:id', userController_1.getUserById);
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map