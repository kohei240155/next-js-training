"use client"

import { FormEvent, useState } from "react";
import styles from "./styles/Home.module.css";
import Title from "./title/page";
import Link from "next/link";
import Counter from "./counter/page";
import TodoList from "./todo-list/page";

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
      <TodoList />
    </>
  );
}