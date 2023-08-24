import { useQuery, useQueryClient } from 'react-query';
import styles from './page.module.css';
import axios from 'axios';
import { NewTodo } from './NewTodo';
import classnames from 'classnames';
import { useEffect } from 'react';
import React from 'react';

type Todo = {
    _id: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    status: 'active' | 'done';
    deadline: string;
};

type ApiResponse = {
    todos: Todo[];
};

const getTodos = async (): Promise<ApiResponse> => {
    const { data } = await axios.get('http://localhost:4000/');
    return data;
};

const deleteTodo = async (id: string) => {
    const { status } = await axios.delete(`http://localhost:4000/delete?id=${id}`);
    return status === 200;
};

const updateTodo = async (todo: Todo) => {
    const { _id, description, deadline, status } = todo;
    const response = await axios.patch(`http://localhost:4000/update?id=${_id}`, {
        description,
        deadline,
        status,
    });

    return response.status === 200;
};

interface TodoItemProps {
    item: Todo;
    updateHandler: (item: Todo, value: string) => void;
    deleteHandler: (id: string) => void;
}

const TodoItem = ({ item, updateHandler, deleteHandler }: TodoItemProps) => {
    const ref = React.useRef<HTMLInputElement>(null);

    return (
        <>
            <input ref={ref} defaultValue={item.description} className={'bg-black'} />
            <div>{item.deadline.slice(0, 10)}</div>
            <button
                className="rounded-full bg-sky-500/100 cursor-pointer"
                onClick={() => updateHandler(item, ref?.current?.value || item.description)}
            >
                Update
            </button>
            <div className="cursor-pointer" onClick={() => deleteHandler(item._id)}>
                X
            </div>
        </>
    );
};

export const Todo = () => {
    const { data, isLoading, isError } = useQuery('todos', getTodos);
    const queryClient = useQueryClient();

    const updateHandler = async (todo: Todo, value: string) => {
        todo.description = value;

        const isUpdated = await updateTodo(todo);

        if (isUpdated) {
            // Invalidate and refetch the 'todos' query when the mutation is successful
            queryClient.invalidateQueries('todos');
        }
    };

    const deleteHandler = async (id: string) => {
        const isDeleted = await deleteTodo(id);

        if (isDeleted) {
            // Invalidate and refetch the 'todos' query when the mutation is successful
            queryClient.invalidateQueries('todos');
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading data</div>;

    return (
        <main className={classnames(styles.main, 'text-2xl flex gap-5')}>
            {data?.todos.map((item) => (
                <div key={item._id} className={'w-96 flex justify-between'}>
                    <TodoItem item={item} updateHandler={updateHandler} deleteHandler={deleteHandler} />
                </div>
            ))}
            <NewTodo />
        </main>
    );
};
