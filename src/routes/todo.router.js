"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
var express_1 = require("express");
var todo_controller_1 = require("../controllers/todo.controller");
exports.todoRouter = (0, express_1.Router)();
exports.todoRouter.get("/app", function (req, res, next) {
    res.send("Todo app...");
});
exports.todoRouter.get("/all", todo_controller_1.getAllTodos);
exports.todoRouter.get("/allByTitle/:title", todo_controller_1.getTodosByTitle);
exports.todoRouter.get("/:tid", todo_controller_1.getTodo);
exports.todoRouter.post("/", todo_controller_1.addTodo);
exports.todoRouter.put("/:tid", todo_controller_1.updateTodo);
exports.todoRouter.delete("/:tid", todo_controller_1.deleteTodo);
