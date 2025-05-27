import React, { useState } from 'react';
import Checkbox from '@/components/checkBox';
import Input from '@/components/input';


function TodoList() {

    const [todoItems, setTodoItems] = useState([
        { id: 1, text: '투두리스트', completed: false },
        { id: 2, text: '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세', completed: false }
    ]);
    
    const [newTodoText, setNewTodoText] = useState('');
    const [isAddingTodo, setIsAddingTodo] = useState(false);

    function addTodo() {
        if (isAddingTodo) {
            if (newTodoText.trim()) {
                const newTodo = {
                    id: Math.max(...todoItems.map(item => item.id), 0) + 1,
                    text: newTodoText.trim(),
                    completed: false
                };
                
                setTodoItems([...todoItems, newTodo]);
                setNewTodoText('');
            }
            setIsAddingTodo(false);
        } else {
            setIsAddingTodo(true);
        }
    }

    function cancelAdd() {
        setIsAddingTodo(false);
        setNewTodoText('');
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            addTodo();
        } else if (e.key === 'Escape') {
            cancelAdd();
        }
    }

    return (
        <div className="cmp-todolist">
            <div className="cmp-todolist__inner">
                <p className="day-goal">
                    오늘의 목표 ({todoItems.filter(item => item.completed).length}/{todoItems.length})
                </p>

                <div className="todo-box">
                    {
                        todoItems.map((item) => (
                            <div key={item.id} className="todo-box__item">
                                <div className="list">
                                    <Checkbox 
                                        checked={item.completed} 
                                        onChange={(checked) => {
                                            const updatedItems = todoItems.map(todo => 
                                                todo.id === item.id ? { ...todo, completed: checked } : todo
                                            );
                                            setTodoItems(updatedItems);
                                        }} 
                                    />
                                    <span className="title">{item.text}</span>
                                </div>
                                <div className="more">
                                    <svg width="16" height="5" viewBox="0 0 16 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 0.5C0.9 0.5 0 1.4 0 2.5C0 3.6 0.9 4.5 2 4.5C3.1 4.5 4 3.6 4 2.5C4 1.4 3.1 0.5 2 0.5ZM14 0.5C12.9 0.5 12 1.4 12 2.5C12 3.6 12.9 4.5 14 4.5C15.1 4.5 16 3.6 16 2.5C16 1.4 15.1 0.5 14 0.5ZM8 0.5C6.9 0.5 6 1.4 6 2.5C6 3.6 6.9 4.5 8 4.5C9.1 4.5 10 3.6 10 2.5C10 1.4 9.1 0.5 8 0.5Z"/>
                                    </svg>
                                </div>
                            </div>
                        ))
                    }
                    
                    {
                        isAddingTodo && (
                            <div className="todo-box__item todo-box__item--adding">
                                <div className="list">
                                    <Checkbox checked={false} disabled />
                                    <input 
                                        type="text" 
                                        className="title-input" 
                                        value={newTodoText}
                                        onChange={(e) => setNewTodoText(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder="할 일을 입력하세요"
                                        autoFocus
                                    />
                                </div>
                                <div className="actions">
                                    <button className="action-btn save" onClick={addTodo}>
                                        <i className="ico" style={{background: 'url(/icons/done.svg) no-repeat center center'}}></i>
                                    </button>
                                    <button className="action-btn cancel" onClick={cancelAdd}>
                                        <i className="ico" style={{background: 'url(/icons/clear.svg) no-repeat center center'}}></i>
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>

                <button className="add-todo" onClick={addTodo}>
                    <div className="text-area">
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 8.5H8V13.5C8 14.05 7.55 14.5 7 14.5C6.45 14.5 6 14.05 6 13.5V8.5H1C0.45 8.5 0 8.05 0 7.5C0 6.95 0.45 6.5 1 6.5H6V1.5C6 0.95 6.45 0.5 7 0.5C7.55 0.5 8 0.95 8 1.5V6.5H13C13.55 6.5 14 6.95 14 7.5C14 8.05 13.55 8.5 13 8.5Z"/>
                        </svg>
                        추가하기
                    </div>
                </button>
            </div>
        </div>
    )
}

export default TodoList;