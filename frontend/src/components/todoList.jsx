import React, { useState } from 'react';
import Checkbox from '@/components/checkBox'


function TodoList() {
    const [isChecked, setIsChecked] = useState(false);


    return (
        <div className="cmp-todolist">
            <div className="cmp-todolist__inner">
                <p className="day-goal">오늘의 목표 (2/4)</p>

                <div className="todo-box">

                    <div className="todo-box__item">
                        <div className="list">
                            <Checkbox checked={isChecked} onChange={setIsChecked} />
                            <span className="title">투두리스트</span>
                        </div>
                        <div className="more">
                            <svg width="16" height="5" viewBox="0 0 16 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 0.5C0.9 0.5 0 1.4 0 2.5C0 3.6 0.9 4.5 2 4.5C3.1 4.5 4 3.6 4 2.5C4 1.4 3.1 0.5 2 0.5ZM14 0.5C12.9 0.5 12 1.4 12 2.5C12 3.6 12.9 4.5 14 4.5C15.1 4.5 16 3.6 16 2.5C16 1.4 15.1 0.5 14 0.5ZM8 0.5C6.9 0.5 6 1.4 6 2.5C6 3.6 6.9 4.5 8 4.5C9.1 4.5 10 3.6 10 2.5C10 1.4 9.1 0.5 8 0.5Z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="todo-box__item">
                        <div className="list">
                            <Checkbox checked={isChecked} onChange={setIsChecked} />
                            <span className="title">투두리스트 투두리스트 투두리스트 투두리스트 투두리스트 투두리스트</span>
                        </div>
                        <div className="more">
                            <svg width="16" height="5" viewBox="0 0 16 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 0.5C0.9 0.5 0 1.4 0 2.5C0 3.6 0.9 4.5 2 4.5C3.1 4.5 4 3.6 4 2.5C4 1.4 3.1 0.5 2 0.5ZM14 0.5C12.9 0.5 12 1.4 12 2.5C12 3.6 12.9 4.5 14 4.5C15.1 4.5 16 3.6 16 2.5C16 1.4 15.1 0.5 14 0.5ZM8 0.5C6.9 0.5 6 1.4 6 2.5C6 3.6 6.9 4.5 8 4.5C9.1 4.5 10 3.6 10 2.5C10 1.4 9.1 0.5 8 0.5Z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="todo-box__item">
                        <div className="list">
                            <Checkbox checked={isChecked} onChange={setIsChecked} />
                            <span className="title">투두리스트</span>
                        </div>
                        <div className="more">
                            <svg width="16" height="5" viewBox="0 0 16 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 0.5C0.9 0.5 0 1.4 0 2.5C0 3.6 0.9 4.5 2 4.5C3.1 4.5 4 3.6 4 2.5C4 1.4 3.1 0.5 2 0.5ZM14 0.5C12.9 0.5 12 1.4 12 2.5C12 3.6 12.9 4.5 14 4.5C15.1 4.5 16 3.6 16 2.5C16 1.4 15.1 0.5 14 0.5ZM8 0.5C6.9 0.5 6 1.4 6 2.5C6 3.6 6.9 4.5 8 4.5C9.1 4.5 10 3.6 10 2.5C10 1.4 9.1 0.5 8 0.5Z"/>
                            </svg>
                        </div>
                    </div>

                </div>

                <div className="add-todo">
                    <div className="text-area">
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 8.5H8V13.5C8 14.05 7.55 14.5 7 14.5C6.45 14.5 6 14.05 6 13.5V8.5H1C0.45 8.5 0 8.05 0 7.5C0 6.95 0.45 6.5 1 6.5H6V1.5C6 0.95 6.45 0.5 7 0.5C7.55 0.5 8 0.95 8 1.5V6.5H13C13.55 6.5 14 6.95 14 7.5C14 8.05 13.55 8.5 13 8.5Z"/>
                        </svg>
                        <span>추가하기</span>
                    </div>
                </div>
            </div>
        </div>


    )
}







export default TodoList;