import mongoose from "mongoose";
const Schema = mongoose.Schema;

const todoSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    {
        statics: {
            findByTitle(title: string) {
                return this.find({ title: new RegExp(title, 'i') });
            }
        }
    }
);
export const Todo = mongoose.model('Todo', todoSchema);
