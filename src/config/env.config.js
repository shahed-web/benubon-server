"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
exports.envConfig = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
};
