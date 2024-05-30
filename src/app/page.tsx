"use client"

import styles from "./styles/Home.module.css";

export default function Home() {

  const handleClick = () => {
    alert("ボタンがクリックされました。");
  };

  return (
    <>
      <h1 className={styles.title}>Hello World</h1>
      <button onClick={handleClick}>Click Me</button>
    </>
  );
}