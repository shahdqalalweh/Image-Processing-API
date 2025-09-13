"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const paramValid_1 = __importDefault(require("../../util/paramValid"));
const path_1 = __importDefault(require("path"));
const images = express_1.default.Router();
images.get('/', paramValid_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const width = parseInt(req.query.width.toString());
    const height = parseInt(req.query.height.toString());
    const newPath = `assets/thumb/${width}w_${height}h_${filename}`;
    res.sendFile(path_1.default.join(process.cwd(), newPath));
}));
module.exports = images;
