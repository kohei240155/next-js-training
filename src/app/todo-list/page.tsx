import React, { useEffect, useState } from "react";
import styles from './TodoList.module.css';

const TodoList = () => {
    const [todos, setTodos] = useState<string[]>([]);
    const [newTodo, setNewTodo] = useState("");

    const handleAddTodo = () => {
        if (newTodo.trim() !== "") {
            const updatedTodos = [...todos, newTodo];
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

    useEffect(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

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
            <ul className={styles.list}>
                {todos.map((todo, index) => (
                    <li key={index} onClick={() => handleRemoveTodo(index)} className={styles.item}>{todo}</li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
