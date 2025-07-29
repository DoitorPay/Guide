import React from 'react';
import TodoList from '@/components/todo/todoList';


function CmpTodoList() {
    return(
        <div className="cmp-guide">
            <p className="guide-text-title">홈 화면에서 / type = "home"</p>
            <div className="example-guide cmp-header">
                <TodoList type='home'/>
            </div>
            <br></br><br></br>

            <p className="guide-text-title">투두리스트 화면 / type = "page-todolist"</p>
            <div className="example-guide cmp-header">
                <TodoList type="page-todolist" />
            </div>
            <br></br><br></br>

            <p className="guide-text-title">투두리스트 화면 / type = "group"</p>
            <div className="example-guide cmp-header">
                <TodoList type="group" />
            </div>
            <br></br><br></br>

            <p className="guide-text-title">그룹 상세 화면 / type = "group-detail"</p>
            <div className="example-guide cmp-header">
                <TodoList type="group-detail" />
            </div>

            {/* <p className="guide-text-title">개인 투두리스트가 없을 때</p>
            <div className="example-guide cmp-header">
                <TodoList type='example-todo'/>
            </div> */}
        </div>
        
    )

}


export default CmpTodoList;