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
const promises_1 = __importDefault(require("fs/promises"));
const sharp_1 = __importDefault(require("sharp"));
const CheckFullImage = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const imgPath = `assets/full/${filename}`;
    try {
        yield promises_1.default.access(imgPath);
        return true;
    }
    catch (err) {
        yield promises_1.default.mkdir('assets/full', { recursive: true });
        return false;
    }
});
const IsImageCached = (filename, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const imgPath = `assets/thumb/${width}w_${height}h_${filename}`;
    try {
        yield promises_1.default.access(imgPath);
        return true;
    }
    catch (err) {
        yield promises_1.default.mkdir('assets/thumb', { recursive: true });
        return false;
    }
});
const DeleteCachedImage = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield promises_1.default.readdir('./assets/thumb');
    yield Promise.all(files
        .filter((f) => f.endsWith(filename))
        .map((img) => promises_1.default.unlink(`./assets/thumb/${img}`)));
});
const ResizeImage = (filename, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield CheckFullImage(filename)))
        throw Error(`${filename} doesn't exist`);
    if (yield IsImageCached(filename, width, height))
        return;
    const imgPath = `assets/full/${filename}`;
    const newPath = `assets/thumb/${width}w_${height}h_${filename}`;
    yield (0, sharp_1.default)(imgPath).resize(width, height).toFile(newPath);
});
module.exports = {
    CheckFullImage,
    ResizeImage,
    IsImageCached,
    DeleteCachedImage,
};
