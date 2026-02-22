"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var env_config_1 = require("./config/env.config");
var port = env_config_1.envConfig.PORT;
app_1.app.listen(3000, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
