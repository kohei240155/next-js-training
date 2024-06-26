"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styles from './TodoList.module.css';
import { TodoProvider, useTodos } from "../context/TodoContext";

const TodoList: React.FC = () => {
    const { todos, setTodos } = useTodos();
    const [newTodo, setNewTodo] = useState("");
    const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");
    const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
    const [editingText, setEditingText] = useState("");
    const [newTodoDueDate, setNewTodoDueDate] = useState("");

    if (todos === null) {
        return <div>Loading...</div>; // ローディング表示
    }

    const handleAddTodo = () => {
        if (newTodo.trim() !== "") {
            const updatedTodos = [...todos, { id: uuidv4(), text: newTodo, completed: false, dueDate: newTodoDueDate }];
            setTodos(updatedTodos);
            setNewTodo("");
            setNewTodoDueDate("");
        }
    };

    const handleRemoveTodo = (id: string) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
    };

    const handleToggleComplete = (id: string) => {
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(newTodos);
    };

    const handleEditTodo = (id: string, text: string) => {
        setEditingTodoId(id);
        setEditingText(text);
    };

    const handleSaveEdit = (id: string) => {
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, text: editingText };
            }
            return todo;
        });
        setTodos(newTodos);
        setEditingTodoId(null);
        setEditingText("");
    };

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
                className={styles.input}
            />
            <input
                value={newTodoDueDate}
                onChange={(e) => setNewTodoDueDate(e.target.value)}
                type="date"
                className={styles.input}
            />
            <button onClick={handleAddTodo} className={styles.button}>追加</button>
            <div>
                <button onClick={() => setFilter("all")}>全て</button>
                <button onClick={() => setFilter("completed")}>完了</button>
                <button onClick={() => setFilter("incomplete")}>未完了</button>
            </div>
            <ul className={styles.list}>
                {filterTodos.map(todo => (
                    <li key={todo.id} className={styles.item}>
                        {editingTodoId === todo.id ? (
                            <>
                                <input
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    type="text"
                                    className={styles.input}
                                />
                                <button onClick={() => handleSaveEdit(todo.id)} className={styles.button}>保存</button>
                            </>
                        ) : (
                            <>
                                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.text}</span>
                                <span
                                    style={{
                                        color: new Date(todo.dueDate) < new Date() ? 'red' : 'black'
                                    }}
                                >
                                    {todo.dueDate}
                                </span>
                                <button onClick={() => handleToggleComplete(todo.id)}>完了</button>
                                <button onClick={() => handleRemoveTodo(todo.id)}>削除</button>
                                <button onClick={() => handleEditTodo(todo.id, todo.text)}>編集</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const TodoListPage: React.FC = () => {
    return (
        <TodoProvider>
            <TodoList />
        </TodoProvider>
    );
};

export default TodoListPage;
