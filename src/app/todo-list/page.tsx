"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styles from './TodoList.module.css';

type Todo = {
    id: string;
    text: string;
    completed: boolean;
}

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");

    const handleAddTodo = () => {
        if (newTodo.trim() !== "") {
            const updatedTodos = [...todos, {id: uuidv4() ,text: newTodo, completed: false}];
            setTodos(updatedTodos);
            setNewTodo("");
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
        }
    };

    const handleRemoveTodo = (id: string) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem("todos", JSON.stringify(newTodos));
    };

    const handleToggleComplete = (id: string) => {
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
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
                        <button onClick={() => handleToggleComplete(todo.id)}>完了</button>
                        <button onClick={() => handleRemoveTodo(todo.id)}>削除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
