import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  }

  return(
    <div>
        <h1>count: {count}</h1>
        <button onClick={increment}>カウントアップ</button>
        <button onClick={decrement}>カウントダウン</button>
    </div>
  );
};

export default Counter;
