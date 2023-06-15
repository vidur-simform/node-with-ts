import { Request, Response, NextFunction } from "express";
import { Todo } from "../models/todo.model";
import { Types } from "mongoose";
import { CustomError } from "../middlewares/errorHandler";

const validateId = (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        const error: CustomError = new Error('Invalid id.');
        error.statusCode = 404;
        throw error;
    }
}

export const getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todos = await Todo.find();
        const msg = (todos.length) ? "Success!" : "No todos found";
        res.status(200).json({ msg, todos });
    }
    catch (err: any) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
};
export const getTodosByTitle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const title = req.params.title || "";
        const todos = await Todo.findByTitle(title);
        const msg = (todos.length) ? "Success!" : "No todos found";
        res.status(200).json({ msg, todos });
    }
    catch (err: any) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
};
export const getTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tid = req.params.tid;
        validateId(tid);
        const todo = await Todo.findById(tid);
        const msg = (todo) ? "Success!" : "No todo found";
        const code = (todo) ? 200 : 404;
        res.status(code).json({ msg, todo });
    }
    catch (err: any) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
};
export const addTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content } = req.body;
        const todo = await Todo.create({ title, content });
        const msg = "Success!", code = 201 ;
        res.status(code).json({ msg,todo });
    }
    catch (err: any) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
};
export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tid = req.params.tid;
        validateId(tid);
        const { title, content } = req.body;
        let todo = await Todo.findById(tid);
        if (!todo) {
            const error:CustomError = new Error('Could not find todo.');
            error.statusCode = 404;
            next(error);
            return;
        }
        todo.title = title;
        todo.content = content;
        todo = await todo.save();
        const msg = "Success!", code = 200 ;
        res.status(code).json({ msg,todo });
    }
    catch (err: any) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
};
export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tid = req.params.tid;
        validateId(tid);
        const todo = await Todo.findByIdAndRemove(tid);
        if (!todo) {
            const error:CustomError = new Error('Could not find todo.');
            error.statusCode = 404;
            next(error);
            return;
        }
        const msg = "Success!", code = 200 ;
        res.status(code).json({ msg });
    }
    catch (err: any) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
};