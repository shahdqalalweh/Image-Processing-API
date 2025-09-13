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
const imageProcess_1 = __importDefault(require("./imageProcess"));
const ValidateParameters = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    if (!filename)
        return res.status(400).send('Error: missing filename parameter');
    if (!req.query.width || !req.query.height)
        return res.status(400).send('Error: missing width or height parameters');
    const width = Number(req.query.width.toString());
    const height = Number(req.query.height.toString());
    if (width <= 0 || height <= 0 || Number.isNaN(width) || Number.isNaN(height))
        return res.status(400).send('Error: invalid width or height parameters');
    try {
        yield imageProcess_1.default.ResizeImage(filename, width, height);
    }
    catch (err) {
        return res.status(404).send(err.toString());
    }
    next();
});
module.exports = ValidateParameters;
