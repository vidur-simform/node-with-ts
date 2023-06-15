import { Request, Response, NextFunction, Router } from "express";
import { getAllTodos, addTodo, updateTodo, getTodo, deleteTodo, getTodosByTitle } from "../controllers/todo.controller";

export const todoRouter = Router();

todoRouter.get("/app", (req: Request, res: Response, next: NextFunction) => {
    res.send("Todo app...")
});

todoRouter.get("/all", getAllTodos);
todoRouter.get("/allByTitle/:title", getTodosByTitle);

todoRouter.get("/:tid", getTodo);
todoRouter.post("/", addTodo);
todoRouter.put("/:tid", updateTodo);
todoRouter.delete("/:tid", deleteTodo);