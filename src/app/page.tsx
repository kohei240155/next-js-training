"use client"

import { FormEvent, useState } from "react";
import styles from "./styles/Home.module.css";
import Title from "./title/page";

export default function Home() {

  const [name, setName] = useState("");
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    alert(`入力された名前: ${name}`);
  };

  return (
    <>
      <Title />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          className={styles.input}
          onChange={(e) => setName(e.target.value)}
          placeholder="名前を入力してください。" />
          <button type="submit">送信</button>
      </form>
    </>
  );
}