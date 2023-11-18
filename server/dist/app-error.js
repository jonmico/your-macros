"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(errMessage, errCode) {
        super();
        this.errMessage = errMessage;
        this.errCode = errCode;
    }
}
exports.default = AppError;
