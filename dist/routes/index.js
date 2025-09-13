"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const images_1 = __importDefault(require("./api/images"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => {
    res.send('Main API route');
});
routes.use('/images', images_1.default);
module.exports = routes;
