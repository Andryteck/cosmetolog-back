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
const axios_1 = __importDefault(require("axios"));
const querystring = require('querystring');
// type SendSms = {
// ????
//     sendSms: (number, text, time) => any;
// }
const instance = axios_1.default.create({
    baseURL: 'https://app.sms.by/api/v1/'
});
function sendSms({ number, text, time }) {
    return __awaiter(this, void 0, void 0, function* () {
        let params = {
            token: '0ffd27c599ea1a79784216c47e26ab5a',
            phone: number,
            message: text,
            time
        };
        const res = yield instance.get(`createSmsMessage?${querystring.stringify(params)}`);
        console.log(res.data);
        // @ts-ignore
        return instance.get(`sendSMS?token=0ffd27c599ea1a79784216c47e26ab5a&message_id=${res.data.message_id}&phone=${params.phone}`);
    });
}
module.exports = sendSms;
//# sourceMappingURL=sendSms.js.map