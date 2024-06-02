import React, { useEffect, useState } from "react";
import styles from './TodoList.module.css';

type Todo = {
    text: string;
    completed: boolean;
}

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");

    const handleAddTodo = () => {
        if (newTodo.trim() !== "") {
            const updatedTodos = [...todos, {text: newTodo, completed: false}];
            setTodos(updatedTodos);
            setNewTodo("");
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
        }
    };

    const handleRemoveTodo = (index: number) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
        localStorage.setItem("todos", JSON.stringify(newTodos));
    };

    const handleToggleComplete = (index: number) => {
        const newTodos = todos.map((todo, i) => {
            if (index === i) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(newTodos);
        localStorage.setItem("todos", JSON.stringify(newTodos));
    };

    useEffect(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    const filterTodos = todos.filter(todo => {
        if (filter === "completed") return todo.completed;
        if (filter === "incomplete") return !todo.completed;
        return true;
    });

    return (
        <div>
            <h1>Todoリスト</h1>
            <input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                type="text"
                placeholder="新しいToDoを入力"
                className={styles.input} />
            <button onClick={handleAddTodo} className={styles.button}>追加</button>
            <div>
                <button onClick={() => setFilter("all")}>全て</button>
                <button onClick={() => setFilter("completed")}>完了</button>
                <button onClick={() => setFilter("incomplete")}>未完了</button>
            </div>
            <ul className={styles.list}>
                {filterTodos.map((todo, index) => (
                    <li key={index} className={styles.item}>
                        <span style={{textDecoration: todo.completed ? "line-through" : "none"}}>{todo.text}</span>
                        <button onClick={() => handleToggleComplete(index)}>完了</button>
                        <button onClick={() => handleRemoveTodo(index)}>削除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
