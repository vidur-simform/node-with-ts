"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1.default.Schema;
var todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    statics: {
        findByTitle: function (title) {
            return this.find({ title: new RegExp(title, 'i') });
        }
    }
});
exports.Todo = mongoose_1.default.model('Todo', todoSchema);
