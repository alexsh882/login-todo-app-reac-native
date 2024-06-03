import { Todo } from '@/types/todo.type';
import todos from '../assets/data/todos.json';



export const TodoServices = {

    getTodos: (): Todo[] => {
        return todos;
    }

}