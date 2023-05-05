import axios from 'axios';
import { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';

const createTodo = async ({ description }: { description: string }) => {
    const { data } = await axios.post('http://localhost:4000/create', {
        description,
        deadline: new Date().toISOString(),
    });
    return data;
};

export const NewTodo = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();
    const mutation = useMutation(createTodo, {
        onSuccess: () => {
            // Invalidate and refetch the 'todos' query when the mutation is successful
            queryClient.invalidateQueries('todos');
        },
    });

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputRef.current?.value.trim()) return;
        console.log(dateRef.current?.value);

        // await mutation.mutateAsync({ description: inputRef.current?.value });
    };

    return (
        <form onSubmit={submitHandler} className={'flex flex-col text-xl'}>
            <label htmlFor={'description'}>Description</label>
            <input type={'text'} ref={inputRef} />
            <label htmlFor={'date'}>Deadline</label>
            <input type={'date'} ref={dateRef} defaultValue={new Date().toISOString().slice(0, 10)} />
            <button type={'submit'}>Add</button>
        </form>
    );
};
