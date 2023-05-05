import { useQuery } from 'react-query';
import styles from './page.module.css';
import axios from 'axios';
import { NewTodo } from './NewTodo';
import classnames from 'classnames';

type Todo = {
    _id: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    status: 'active' | 'done';
};

type ApiResponse = {
    todos: Todo[];
};

const getTodos = async (): Promise<ApiResponse> => {
    const { data } = await axios.get('http://localhost:4000/');
    return data;
};

export const Todo = () => {
    const { data, isLoading, isError } = useQuery('todos', getTodos);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading data</div>;

    return (
        <main className={classnames(styles.main, 'text-2xl')}>
            {data?.todos.map((item) => (
                <div key={item._id}>{item.description}</div>
            ))}
            <NewTodo />
        </main>
    );
};
