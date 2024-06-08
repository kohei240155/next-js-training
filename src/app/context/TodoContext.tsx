import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type Todo = {
    id: string;
    text: string;
    completed: boolean;
    dueDate: string;
};

type TodoContextType = {
    todos: Todo[] | null; // todosをnull許容に変更
    setTodos: React.Dispatch<React.SetStateAction<Todo[] | null>>; // setTodosもnull許容に変更
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[] | null>(null); // 初期状態をnullにする

    useEffect(() => {
        if (typeof window !== 'undefined') { // クライアントサイドでのみ実行
            const savedTodos = localStorage.getItem('todos');
            if (savedTodos) {
                try {
                    setTodos(JSON.parse(savedTodos));
                } catch (error) {
                    console.error("Error parsing saved todos from localStorage", error);
                    setTodos([]);
                }
            } else {
                setTodos([]);
            }
        }
    }, []);

    useEffect(() => {
        if (todos !== null && typeof window !== 'undefined') { // todosがnullでないことを確認
            console.log("Saving todos to localStorage", todos);
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos]);

    return (
        <TodoContext.Provider value={{ todos, setTodos }}>
            {children}
        </TodoContext.Provider>
    );
};

const useTodos = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('TodoProviderの中でしかuseTodosは使えません。');
    }
    return context;
};

export { TodoProvider, useTodos };
