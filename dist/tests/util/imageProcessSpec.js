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
Object.defineProperty(exports, "__esModule", { value: true });
const imageProcess_1 = __importDefault(require("../../util/imageProcess"));
const promises_1 = __importDefault(require("fs/promises"));
describe('Testing image processing functions', () => {
    describe('Test if files exist or not', () => {
        it('base image exists', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield imageProcess_1.default.CheckFullImage('icelandwaterfall.jpg')).toBe(true);
        }));
        it('not a real image doesnt exist', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield imageProcess_1.default.CheckFullImage('notreal.file')).toBe(false);
        }));
    });
    describe('Test cached images exist or not', () => {
        it('not real file is not cached', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield imageProcess_1.default.IsImageCached('notreal.file', 200, 200)).toBe(false);
        }));
        it('cached image exists', () => __awaiter(void 0, void 0, void 0, function* () {
            yield imageProcess_1.default.ResizeImage('palmtunnel.jpg', 500, 500);
            expect(yield imageProcess_1.default.IsImageCached('palmtunnel.jpg', 500, 500)).toBe(true);
            yield promises_1.default.unlink('./assets/thumb/500w_500h_palmtunnel.jpg');
        }));
    });
    describe('Test deleting images', () => {
        it('deleting a non real file doesnt throw error', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(() => __awaiter(void 0, void 0, void 0, function* () {
                yield imageProcess_1.default.DeleteCachedImage('notreal.file');
            })).not.toThrow();
        }));
        it('should delete all cached files', () => __awaiter(void 0, void 0, void 0, function* () {
            const img = 'santamonica.jpg';
            yield imageProcess_1.default.ResizeImage(img, 1000, 500);
            yield imageProcess_1.default.ResizeImage(img, 800, 300);
            yield imageProcess_1.default.ResizeImage(img, 200, 700);
            yield imageProcess_1.default.DeleteCachedImage(img);
            const files = (yield promises_1.default.readdir('./assets/thumb')).filter((f) => f.endsWith(img));
            expect(files).toHaveSize(0);
        }));
    });
});
