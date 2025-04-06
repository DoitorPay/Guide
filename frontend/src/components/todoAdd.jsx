import React, { useState } from 'react';

function TodoAdd() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  const handleChange = (e) => {
    setTodoValue(e.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();

    const trimmed = todoValue.trim();
    if (trimmed === '') return;

    // 새 항목을 리스트 맨 앞에 추가
    setTodos((prevTodos) => [trimmed, ...prevTodos]);
    setTodoValue('');
  };


  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <form onSubmit={handleAddTodo} style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={todoValue}
          onChange={handleChange}
          placeholder="할 일을 입력하세요"
          style={{ flex: 1 }}
        />
        <button type="submit">등록</button>
      </form>

      <ul style={{ marginTop: '20px', paddingLeft: '20px' }}>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoAdd;