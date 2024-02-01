import React, { useState } from 'react';

function Input() {
  // Define a state variable 'count' with an initial value of 0
  const [count, setCount] = useState(0);

  // Function to handle incrementing the count
  const incrementCount = () => {
    setCount(count + 1);
  };

  // Function to handle decrementing the count
  const decrementCount = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>Counter App</h1>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
      <button onClick={decrementCount}>Decrement</button>
    </div>
  );
}

export default Input;
