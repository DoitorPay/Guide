import React from 'react';
import TodoList from '@/components/todoList';


function CmpTodoList() {
    return(
        <div className="cmp-guide">
            <div className="example-guide cmp-header">
                <TodoList />
            </div>
        </div>
    )

}


export default CmpTodoList;