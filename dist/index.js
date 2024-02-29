"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*ini adalah file utama untuk menjalankan server backend */
/** import library express */
const express_1 = __importDefault(require("express"));
/**buat wadah inisiasi express */
const app = (0, express_1.default)();
/** mendefinisikan PORT berjalannya server */
const PORT = 12000;
/**proses pertama untuk handle request */
app.get(`/see`, (request, response) => {
    /**ini adalah proses handle request dengan url adress
     * url adress :https//localhost:8000/serena
     * method get
     */
    //memberi respon
    return response.status(200).json({
        message: `Hello Bois `,
    });
});
/**run server  */
app.listen(PORT, () => {
    console.log(`😋 Server running on port ${PORT}`);
});
// 🔰
