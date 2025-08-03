import React, { useState, useEffect } from 'react';
import { useUserGroupStore } from '@/stores/useUserGroupStore';


const PanaltyNoti = () => {
    const [uncompletedGroupTodos, setUncompletedGroupTodos] = useState([]);
    const { userGroups, fetchUserGroups } = useUserGroupStore();

    useEffect(() => {
        fetchUserGroups();
    }, [fetchUserGroups]);

    useEffect(() => {
        const fetchUncompletedGroupTodos = async () => {
            if (!userGroups || (!userGroups.member && !userGroups.leader)) {
                return;
            }

            const allGroupTodos = [];
            const allGroups = [];

            if (userGroups.member) {
                allGroups.push(...userGroups.member);
            }
            if (userGroups.leader) {
                allGroups.push(...userGroups.leader);
            }

            allGroups.forEach(group => {
                if (group.todo && Array.isArray(group.todo)) {
                    group.todo.forEach(todoItem => {
                        let parsedTodo = null;
                        let jsonString = '';

                        if (typeof todoItem === 'string' && todoItem.includes('///')) {
                            jsonString = todoItem.split('///')[0];
                        } else if (typeof todoItem === 'string') {
                            jsonString = todoItem;
                        }

                        if (jsonString) {
                            try {
                                const validJsonString = jsonString.replace(/'/g, '"');
                                parsedTodo = JSON.parse(validJsonString);
                            } catch (error) {
                                const parts = todoItem.split("///");
                                if (parts.length >= 4) { // item, exec_date, id, done
                                    const [text, exec_date, id, done] = parts;
                                    parsedTodo = { todos: [{ id: id, item: text, done: done, exec_date: exec_date }] };
                                } else {
                                    console.warn("알 수 없는 형식의 그룹 투두 또는 JSON 파싱 에러:", todoItem, error);
                                }
                            }
                        }

                        if (parsedTodo && parsedTodo.todos && Array.isArray(parsedTodo.todos)) {
                            parsedTodo.todos.forEach(innerTodo => {
                                if (String(innerTodo.done).toLowerCase() !== 'true') { // 체크되지 않은 투두만 추가
                                    allGroupTodos.push({
                                        text: innerTodo.item,
                                        id: innerTodo.id,
                                        completed: String(innerTodo.done).toLowerCase() === 'true',
                                        groupId: group.gid,
                                        groupName: group.groupname, // 그룹 이름을 함께 저장
                                        exec_date: innerTodo.exec_date || ''
                                    });
                                }
                            });
                        }
                    });
                }
            });
            setUncompletedGroupTodos(allGroupTodos);
        };

        if (userGroups) {
            fetchUncompletedGroupTodos();
        }
    }, [userGroups]);

    return (
        <div className="cmp-panalty-noti">
            {uncompletedGroupTodos.length > 0 && (
                <div className="panalty-list">
                    <p className="text">
                        <img src="/public/icons/error.svg" alt="에러" />
                        <span>체크되지 않은 그룹 미션이 있어요.</span>
                    </p>
                    <ul className="list-wrap">
                        {uncompletedGroupTodos.map((todo) => (
                            <li key={todo.id} className="list-item">
                                <span className="group-name">[{todo.groupName}]</span> {todo.text}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PanaltyNoti;