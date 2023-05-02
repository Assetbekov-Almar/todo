'use client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Todo } from './Todo';

const queryClient = new QueryClient();

export default function Home() {
    return (
        <QueryClientProvider client={queryClient}>
            <Todo />
        </QueryClientProvider>
    );
}
