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
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const promises_1 = __importDefault(require("fs/promises"));
const request = (0, supertest_1.default)(index_1.default);
describe('Testing endpoints', () => {
    describe('Test invalid requests', () => {
        it('images endpoint with no parameters is missing filename bad request', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images');
            expect(response.badRequest).toBe(true);
            expect(response.text).toEqual('Error: missing filename parameter');
        }));
        it('images endpoint with no width and height is missing width or height bad request', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=img.jpg');
            expect(response.badRequest).toBe(true);
            expect(response.text).toEqual('Error: missing width or height parameters');
        }));
        it('images endpoint with only no width is missing width or height bad request', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=img.jpg&height=500');
            expect(response.badRequest).toBe(true);
            expect(response.text).toEqual('Error: missing width or height parameters');
        }));
        it('images endpoint with only no height is missing width or height bad request', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=img.jpg&width=500');
            expect(response.badRequest).toBe(true);
            expect(response.text).toEqual('Error: missing width or height parameters');
        }));
        it('images endpoint with text width is invalid width or height bad request', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=img.jpg&width=fivehundred&height=500');
            expect(response.badRequest).toBe(true);
            expect(response.text).toEqual('Error: invalid width or height parameters');
        }));
        it('images endpoint with text height is invalid width or height bad request', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=img.jpg&width=500&height=500fivehundred');
            expect(response.badRequest).toBe(true);
            expect(response.text).toEqual('Error: invalid width or height parameters');
        }));
        it('images endpoint with non existant image is not found request', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=notreal.file&width=500&height=500');
            expect(response.notFound).toBe(true);
            expect(response.text).toEqual(`Error: notreal.file doesn't exist`);
        }));
    });
    describe('Test valid requests', () => {
        it('create a resized image', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=fjord.jpg&width=500&height=500');
            expect(response.ok).toBe(true);
            yield promises_1.default.unlink('./assets/thumb/500w_500h_fjord.jpg');
        }));
        it('create 3 resized images', () => __awaiter(void 0, void 0, void 0, function* () {
            const response1 = yield request.get('/api/images?filename=encenadaport.jpg&width=800&height=300');
            yield promises_1.default.unlink('./assets/thumb/800w_300h_encenadaport.jpg');
            const response2 = yield request.get('/api/images?filename=icelandwaterfall.jpg&width=400&height=100');
            yield promises_1.default.unlink('./assets/thumb/400w_100h_icelandwaterfall.jpg');
            const response3 = yield request.get('/api/images?filename=palmtunnel.jpg&width=200&height=600');
            yield promises_1.default.unlink('./assets/thumb/200w_600h_palmtunnel.jpg');
            expect(response1.ok && response2.ok && response3.ok).toBe(true);
        }));
    });
});
