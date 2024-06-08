"use client"

import { FormEvent, useState } from "react";
import styles from "./styles/Home.module.css";
import Title from "./title/page";
import Link from "next/link";
import Counter from "./counter/page";
import { TodoProvider } from "./context/TodoContext";
import UserList from "./components/UserList";

export default function Home() {
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (name) {
      setIsSubmitted(true);
      alert(`入力された名前: ${name}`);
    }
  };

  return (
    <TodoProvider>
      <>
        <Title text="Welcome to My App" />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            className={styles.input}
            onChange={(e) => setName(e.target.value)}
            placeholder="名前を入力してください。" />
            <button type="submit">送信</button>
        </form>
        <Link href="/new-page">
          新しいページへ
        </Link>
        {isSubmitted && <Counter />}
        <Link href="/todo-list">
          Todoリストへ
        </Link>
        <UserList />
      </>
    </TodoProvider>
  );
}