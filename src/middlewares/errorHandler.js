"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errorHandler = function (error, req, res, next) {
    var status = error.statusCode || 500;
    var message = error.message;
    var data = error.data;
    res.status(status).json({ message: message, data: data });
};
exports.errorHandler = errorHandler;
