"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Root route');
});
app.use('/api', routes_1.default);
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
module.exports = app;
