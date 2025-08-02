import React, { useState, useEffect, useCallback } from 'react';
import Checkbox from '@/components/input/checkBox';
import MoreOption from '@/components/popupModal/moreOption';
// import { useUserStore } from '@/stores/useUserStore'; // userId 임포트 제거

const TodoList = ({ type, selectedDate, onTodoProgressChange, onAllTodosChange, groupId }) => {
    // 투두 목록 상태
    const [todoItems, setTodoItems] = useState([]);
    const [groupTodos, setGroupTodos] = useState([]);
    
    // 투두 추가 관련 상태
    const [newTodoText, setNewTodoText] = useState('');
    const [isAddingTodo, setIsAddingTodo] = useState(false);

    // 더보기 및 수정 관련 상태
    const [moreOption, setMoreOption] = useState(false);
    const [selectedTodoId, setSelectedTodoId] = useState(null);
    const [selectedTodoType, setSelectedTodoType] = useState(null); // 'personal' or 'group'
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editingTodoType, setEditingTodoType] = useState(null);
    const [editingText, setEditingText] = useState('');

    // const { userId, fetchUserInfo } = useUserStore(); // userId 관련 변수 제거

    // selectedDate의 기본값 설정 (props로 전달되지 않을 경우 오늘 날짜)
    const today = new Date().toISOString().slice(0, 10);
    const effectiveSelectedDate = selectedDate || today;




    // 투두 목록 가져오기 함수 (개인 투두)
    const fetchPersonalTodos = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8000/api/user/user-todo');
            if (!response.ok) {
                const errorData = await response.json();
                console.error('투두 목록 가져오기 에러:', errorData);
                // alert('투두 목록을 가져오는 중 오류가 발생했습니다. 다시 시도해주세요.');
                return;
            }
            const data = await response.json();
            console.log("----- 개인 투두 GET -----");
            console.log(JSON.stringify(data, null, 2));
            console.log("-------------------");
            if (data && data.todo && Array.isArray(data.todo)) {
                const formattedTodos = data.todo.map((item) => {
                    // const itemDate = new Date(item.exec_date).toISOString().slice(0, 10);
                    const itemDate = item.exec_date ? new Date(item.exec_date).toISOString().slice(0, 10) : '';
                    // const selected = new Date(selectedDate);
                    return {
                        text: item.item,
                        id: item.id,
                        completed: String(item.done).toLowerCase() === 'true',
                        exec_date: item.exec_date,
                        isCurrentDate: itemDate === effectiveSelectedDate
                    };
                });
                setTodoItems(formattedTodos);

                if (onTodoProgressChange) {
                    const todayTodos = formattedTodos.filter(item => item.isCurrentDate === true);
                    const completedTodayTodos = todayTodos.filter(item => item.completed).length;
                    onTodoProgressChange(todayTodos.length, completedTodayTodos);
                }
                if (onAllTodosChange) {
                    const datesCompletion = {};
                    formattedTodos.forEach(item => {
                        if (!datesCompletion[item.exec_date]) {
                            datesCompletion[item.exec_date] = { total: 0, completed: 0 };
                        }
                        datesCompletion[item.exec_date].total++;
                        if (item.completed) {
                            datesCompletion[item.exec_date].completed++;
                        }
                    });
                    const completedDates = {};
                    for (const date in datesCompletion) {
                        completedDates[date] = datesCompletion[date].total > 0 && datesCompletion[date].total === datesCompletion[date].completed;
                    }
                    onAllTodosChange(completedDates);
                }
            } else {
                setTodoItems([]);
            }
        } catch (error) {
            console.error('네트워크 에러 또는 서버 응답 문제:', error);
            // alert('서버와 통신 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.');
        }
    }, [effectiveSelectedDate, onTodoProgressChange, onAllTodosChange]);




    
    // 투두 목록 가져오기 함수 (그룹 투두)
    const fetchGroupTodos = useCallback(async () => {
        try {
            // 1. 사용자가 가입된 그룹 ID 목록 가져오기
            const userGroupsResponse = await fetch('http://localhost:8000/user/group-participating');
            if (!userGroupsResponse.ok) {
                const errorData = await userGroupsResponse.json();
                console.error('사용자 그룹 목록 가져오기 에러:', errorData);
                return;
            }
            const userGroupsData = await userGroupsResponse.json();
            console.log("----- 사용자 참여 그룹 GET -----");
            console.log(JSON.stringify(userGroupsData, null, 2));
            console.log("--------------------------");

            const allGroupTodos = [];
            const allGroups = [];

            if (userGroupsData.member) {
                allGroups.push(...userGroupsData.member);
            }
            if (userGroupsData.leader) {
                allGroups.push(...userGroupsData.leader);
            }

            allGroups.forEach(group => {
                if (group.todo && Array.isArray(group.todo)) {
                    group.todo.forEach(todoItem => {
                        const [text, exec_date, id, done] = todoItem.split("///");
                        allGroupTodos.push({
                            text: text,
                            id: id,
                            completed: String(done).toLowerCase() === 'true',
                            exec_date: exec_date, 
                            groupId: group.gid
                        });
                    });
                }
            });
            console.log("----- 처리된 그룹 투두 목록 -----");
            console.log(JSON.stringify(allGroupTodos, null, 2));
            console.log("--------------------------");
            setGroupTodos(allGroupTodos);

        } catch (error) {
            console.error('네트워크 에러 또는 서버 응답 문제:', error);
        }
    }, []);





    useEffect(() => {
        if (type === 'home' || type === 'page-todolist') {
            fetchPersonalTodos();
            if (type === 'home') { // home 타입일 때만 그룹 투두를 가져옴
                // console.log('Fetching group todos for home type. Current userId:', userId); // userId 관련 로깅 제거
                fetchGroupTodos();
            }
        } else if ((type === 'group' || type === 'group-detail') && groupId) {
            fetchGroupTodos();
        }
    }, [fetchPersonalTodos, fetchGroupTodos, type, groupId]);

    // 체크박스 변경 핸들러
    const handleCheckboxChange = useCallback(async (item, checked, todoType) => {
        if (todoType === 'personal') {
            const originalTodo = todoItems.find(todo => todo.id === item.id);
            if (!originalTodo) return;

            // Optimistic UI Update
            const updatedItems = todoItems.map(todo => 
                todo.id === item.id ? { ...todo, completed: checked } : todo
            );
            setTodoItems(updatedItems);

            try {
                const updatedTodoData = {
                    id: item.id,
                    item: item.text,
                    done: checked,
                    exec_date: item.exec_date
                };

                const response = await fetch('http://localhost:8000/user/user-todo', {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ item: updatedTodoData }),
                });

                if (!response.ok) {
                    setTodoItems(todoItems); // UI 롤백
                    const errorData = await response.json();
                    console.error('개인 투두 완료 상태 업데이트 에러:', errorData);
                    alert('개인 투두 완료 상태 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.');
                    return;
                }

                console.log('----- 개인 투두 완료 상태 업데이트 성공 -----');
                fetchPersonalTodos(); // 성공 시 투두 목록 새로고침

            } catch (error) {
                setTodoItems(todoItems); // UI 롤백
                console.error('네트워크 에러 또는 서버 응답 문제:', error);
                alert('서버와 통신 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.');
            }
        } else if (todoType === 'group') {
            const originalGroupTodo = groupTodos.find(todo => todo.id === item.id);
            if (!originalGroupTodo) return;

            // Optimistic UI Update
            const updatedGroupItems = groupTodos.map(todo => 
                todo.id === item.id ? { ...todo, completed: checked } : todo
            );
            setGroupTodos(updatedGroupItems);

            try {
                const updatedGroupTodoData = {
                    id: item.id,
                    item: item.text,
                    done: checked,
                    exec_date: originalGroupTodo.exec_date // exec_date가 없으면 빈 문자열 또는 null 처리
                };

                const response = await fetch(`http://localhost:8000/group/todo?id=${item.groupId}`, { // item.groupId 사용
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ item: updatedGroupTodoData }),
                });

                if (!response.ok) {
                    setGroupTodos(groupTodos); // UI 롤백
                    const errorData = await response.json();
                    console.error('그룹 투두 완료 상태 업데이트 에러:', errorData);
                    alert('그룹 투두 완료 상태 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.');
                    return;
                }

                console.log('----- 그룹 투두 완료 상태 업데이트 성공 -----');
                fetchGroupTodos(); // 성공 시 그룹 투두 목록 새로고침
            } catch (error) {
                setGroupTodos(groupTodos); // UI 롤백
                console.error('네트워크 에러 또는 서버 응답 문제:', error);
                alert('서버와 통신 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.');
            }
        }
    }, [todoItems, groupTodos, fetchPersonalTodos, fetchGroupTodos]); // groupId는 handleCheckboxChange에서 사용되지 않으므로 제거

    // 투두 추가 관련 함수
    async function addTodo() {
        if (isAddingTodo) {
            if (newTodoText.trim()) {
                const validation = /[\\/"'*]/;
                if (validation.test(newTodoText)) {
                    alert("투두 내용에는 \\, /, \", ', * 문자를 포함할 수 없습니다.");
                    setNewTodoText('');
                    return;
                }

                try {
                    if (type === 'personal' || type === 'home' || type === 'page-todolist') {
                        const todoData = {
                            item: newTodoText.trim(),
                            exec_date: new Date(effectiveSelectedDate).toISOString().slice(0, 10) // effectiveSelectedDate 사용
                        };
                        console.log("----- 개인 투두 폼 데이터 -----");
                        console.log(JSON.stringify(todoData, null, 2));
                        console.log("-------------------");

                        const response = await fetch('http://localhost:8000/user/user-todo', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(todoData),
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            console.error('개인 투두 추가 에러:', errorData);
                            alert('개인 투두 추가 중 오류가 발생했습니다. 다시 시도해주세요.');
                            return;
                        }

                        const addedTodo = await response.json(); 
                        console.log('----- 추가된 개인 투두 응답 -----');
                        console.log(JSON.stringify(addedTodo, null, 2));
                        console.log('---------------------------');

                        // 프론트에서 고유ID 부여 및 상태 업데이트
                        const newIdForFrontend = addedTodo?.id || `${Date.now()}-${todoItems.length}`;
                        const newTodoItem = {
                            id: newIdForFrontend,
                            text: newTodoText.trim(),
                            completed: false,
                            exec_date: effectiveSelectedDate, // 날짜 문자열로 저장
                            isCurrentDate: true // 새로 추가된 투두는 항상 현재 날짜 투두로 표시
                        };
                        setTodoItems([...todoItems, newTodoItem]);
                        setNewTodoText('');
                        fetchPersonalTodos(); // 투두 추가 후 목록 새로고침
                    } else if (type === 'group' || type === 'group-detail') {
                        // groupId를 props로 받거나, 추가할 때 어떤 그룹인지 선택하도록 해야 함.
                        // 현재는 groupId를 props로 받고 있으므로 이를 사용.
                        if (!groupId) {
                            alert('그룹 ID가 없습니다. 그룹 투두를 추가하려면 그룹을 선택해야 합니다.');
                            return;
                        }
                        const groupTodoData = {
                            item: newTodoText.trim()
                        };
                        console.log("----- 그룹 투두 폼 데이터 -----");
                        console.log(JSON.stringify(groupTodoData, null, 2));
                        console.log("-------------------");

                        const response = await fetch(`http://localhost:8000/group/todo?id=${groupId}`, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(groupTodoData),
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            console.error('그룹 투두 추가 에러:', errorData);
                            alert('그룹 투두 추가 중 오류가 발생했습니다. 다시 시도해주세요.');
                            return;
                        }

                        const addedGroupTodo = await response.json();
                        console.log('----- 추가된 그룹 투두 응답 -----');
                        console.log(JSON.stringify(addedGroupTodo, null, 2));
                        console.log('---------------------------');
                        fetchGroupTodos(); // 그룹 투두 추가 후 목록 새로고침
                    }
                } catch (error) {
                    console.error('네트워크 에러 또는 서버 응답 문제:', error);
                    // alert('서버와 통신 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.');
                }
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


    // 더보기 및 수정/삭제 관련 함수
    function handleMoreClick(todoId, todoType) {
        setSelectedTodoId(todoId);
        setSelectedTodoType(todoType);
        setMoreOption(true);
    }

    function closeMoreOption() {
        setMoreOption(false);
        setSelectedTodoId(null);
        setSelectedTodoType(null);
    }

    function handleEditTodo() {
        const selectedTodo = getSelectedTodo();
        if (selectedTodo) {
            setEditingTodoId(selectedTodoId);
            setEditingTodoType(selectedTodoType);
            setEditingText(selectedTodo.text);
        }
        closeMoreOption();
    }

    function saveEditedTodo() {
        if (editingText.trim()) {
            const validation = /[\\/"'*]/;
            if (validation.test(editingText)) {
                alert("투두 내용에는 \\, /, \", ', * 문자를 포함할 수 없습니다.");
                setNewTodoText('');
                return;
            }
            if (editingTodoType === 'personal') {
                const originalTodo = todoItems.find(item => item.id === editingTodoId);
                const updatedTodoData = {
                    id: editingTodoId,
                    item: editingText.trim(),
                    done: originalTodo.completed,
                    exec_date: originalTodo.exec_date
                };

                fetch('http://localhost:8000/user/user-todo', {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ item: updatedTodoData }),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('개인 투두 수정 실패');
                    }
                    return response.json();
                })
                .then(() => {
                    fetchPersonalTodos(); // 수정 후 목록 새로고침
                })
                .catch(error => {
                    console.error('개인 투두 수정 에러:', error);
                    alert('개인 투두 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
                });

            } else if (editingTodoType === 'group') {
                const originalGroupTodo = groupTodos.find(item => item.id === editingTodoId);
                if (!originalGroupTodo || !originalGroupTodo.groupId) {
                    alert('그룹 ID를 찾을 수 없습니다.');
                    return;
                }
                const updatedGroupTodoData = {
                    id: editingTodoId,
                    item: editingText.trim(),
                    done: originalGroupTodo.completed,
                    exec_date: originalGroupTodo.exec_date // 그룹 투두도 exec_date가 있을 수 있으므로 포함
                };

                fetch(`http://localhost:8000/group/todo?id=${originalGroupTodo.groupId}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ item: updatedGroupTodoData }),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('그룹 투두 수정 실패');
                    }
                    return response.json();
                })
                .then(() => {
                    fetchGroupTodos(); // 수정 후 목록 새로고침
                })
                .catch(error => {
                    console.error('그룹 투두 수정 에러:', error);
                    alert('그룹 투두 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
                });
            }
        }
        cancelEdit();
    }

    function cancelEdit() {
        setEditingTodoId(null);
        setEditingTodoType(null);
        setEditingText('');
    }

    function handleEditKeyPress(e) {
        if (e.key === 'Enter') {
            saveEditedTodo();
        } else if (e.key === 'Escape') {
            cancelEdit();
        }
    }

    async function handleDeleteTodo() {
        if (selectedTodoType === 'personal') {
            try {
                const deleteData = {
                    list: { id: selectedTodoId },
                };
                console.log("----- 개인 투두 삭제 폼 데이터 -----");
                console.log(JSON.stringify(deleteData, null, 2));
                console.log("---------------------------");

                const response = await fetch('http://localhost:8000/user/user-todo', {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(deleteData),
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('개인 투두 삭제 에러:', errorData);
                    alert('개인 투두 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
                    return;
                }

                console.log('----- 삭제된 개인 투두 응답 -----');
                console.log(JSON.stringify(await response.json(), null, 2));
                console.log('---------------------------');
                
                fetchPersonalTodos(); // 삭제 후 목록 새로고침
            } catch (error) {
                console.error('네트워크 에러 또는 서버 응답 문제:', error);
                alert('서버와 통신 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.');
            }
        } else if (selectedTodoType === 'group') {
            const selectedTodo = getSelectedTodo();
            if (!selectedTodo || !selectedTodo.groupId) {
                alert('그룹 ID를 찾을 수 없습니다.');
                return;
            }
            try {
                const deleteData = {
                    list: { id: selectedTodoId },
                };
                console.log("----- 그룹 투두 삭제 폼 데이터 -----");
                console.log(JSON.stringify(deleteData, null, 2));
                console.log("---------------------------");

                const response = await fetch(`http://localhost:8000/group/todo?id=${selectedTodo.groupId}`, {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(deleteData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('그룹 투두 삭제 에러:', errorData);
                    alert('그룹 투두 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
                    return;
                }

                console.log('----- 삭제된 그룹 투두 응답 -----');
                console.log(JSON.stringify(await response.json(), null, 2));
                console.log('---------------------------');

                fetchGroupTodos(); // 삭제 후 목록 새로고침
            } catch (error) {
                console.error('네트워크 에러 또는 서버 응답 문제:', error);
                alert('서버와 통신 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.');
            }
        }
        closeMoreOption();
    }

    // 선택된 todo의 정보 가져오기
    function getSelectedTodo() {
        if (selectedTodoType === 'personal') {
            return todoItems.find(item => item.id === selectedTodoId);
        } else if (selectedTodoType === 'group') {
            return groupTodos.find(item => item.id === selectedTodoId);
        }
        return null;
    }

    return (
        <div div className={`cmp-todolist${type === 'group-detail' ? '--group' : ''}`}>

            <div className="cmp-todolist__inner">
                {
                    (() => {
                        const filteredPersonalTodos = todoItems.filter(item => item.isCurrentDate === true);
                        if (type === 'group' || type === 'group-detail') {
                            return groupTodos.length === 0 && (
                                <p className="no-todo">
                                    이번주 그룹 미션이 아직 생성되지 않았어요.<br></br>
                                </p>
                            );
                        } else if (type === 'home' || type === 'page-todolist') {
                            return filteredPersonalTodos.length === 0 && !isAddingTodo && (
                                <p className="no-todo">
                                    설정된 목표가 없습니다.<br></br>
                                    목표를 추가해 보세요.
                                </p>
                            );
                        } else if (type === 'example-todo') {
                            return (
                                <p className="no-todo">
                                    설정된 목표가 없습니다.<br></br>
                                    목표를 추가해 보세요.
                                </p>
                            );
                        }
                        return null;
                    })()
                }

                {
                    (type === 'home' && todoItems.filter(item => item.isCurrentDate === true).length > 0) && (
                        <p className="day-goal">
                            오늘의 목표 ({todoItems.filter(item => item.isCurrentDate === true && item.completed).length}/{todoItems.filter(item => item.isCurrentDate === true).length})
                        </p>
                    )
                }



                {
                    (todoItems.length > 0 || isAddingTodo) && (type === 'home' || type === 'page-todolist') && (
                        <div className="todo-box">
                            {
                                todoItems.filter((item) => {
                                    return item.isCurrentDate === true;
                                }).map((item) => (
                                    <div key={item.id} className="todo-box__item">
                                        <div className="list">
                                            <Checkbox 
                                                checked={item.completed} 
                                                onChange={(checked) => handleCheckboxChange(item, checked, 'personal')} 
                                            />
                                            {editingTodoId === item.id && editingTodoType === 'personal' ? (
                                                <input 
                                                    type="text" 
                                                    className="title-input" 
                                                    value={editingText}
                                                    onChange={(e) => setEditingText(e.target.value)}
                                                    onKeyDown={handleEditKeyPress}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span className={`title ${item.completed ? 'done' : ''}`}>{item.text}</span>
                                            )}
                                        </div>
                                        {editingTodoId === item.id && editingTodoType === 'personal' ? (
                                            <div className="actions">
                                                <button className="action-btn save" onClick={saveEditedTodo}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25">
                                                        <path d="M9 16.7L5.5 13.2C5.11 12.81 4.49 12.81 4.1 13.2C3.71 13.59 3.71 14.21 4.1 14.6L8.29 18.79C8.68 19.18 9.31 19.18 9.7 18.79L20.3 8.20001C20.69 7.81001 20.69 7.19001 20.3 6.80001C19.91 6.41001 19.29 6.41001 18.9 6.80001L9 16.7Z" fill="#4C4C4C"/>
                                                    </svg>
                                                </button>
                                                <button className="action-btn cancel" onClick={cancelEdit}>
                                                    <svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.3 1.20997C12.91 0.819971 12.28 0.819971 11.89 1.20997L7 6.08997L2.11 1.19997C1.72 0.809971 1.09 0.809971 0.700001 1.19997C0.310001 1.58997 0.310001 2.21997 0.700001 2.60997L5.59 7.49997L0.700001 12.39C0.310001 12.78 0.310001 13.41 0.700001 13.8C1.09 14.19 1.72 14.19 2.11 13.8L7 8.90997L11.89 13.8C12.28 14.19 12.91 14.19 13.3 13.8C13.69 13.41 13.69 12.78 13.3 12.39L8.41 7.49997L13.3 2.60997C13.68 2.22997 13.68 1.58997 13.3 1.20997Z" fill="#4C4C4C"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="more" onClick={() => handleMoreClick(item.id, 'personal')}>
                                                <svg width="16" height="5" viewBox="0 0 16 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2 0.5C0.9 0.5 0 1.4 0 2.5C0 3.6 0.9 4.5 2 4.5C3.1 4.5 4 3.6 4 2.5C4 1.4 3.1 0.5 2 0.5ZM14 0.5C12.9 0.5 12 1.4 12 2.5C12 3.6 12.9 4.5 14 4.5C15.1 4.5 16 3.6 16 2.5C16 1.4 15.1 0.5 14 0.5ZM8 0.5C6.9 0.5 6 1.4 6 2.5C6 3.6 6.9 4.5 8 4.5C9.1 4.5 10 3.6 10 2.5C10 1.4 9.1 0.5 8 0.5Z"/>
                                                </svg>
                                            </div>
                                        )}
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
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25">
                                                    <path d="M9 16.7L5.5 13.2C5.11 12.81 4.49 12.81 4.1 13.2C3.71 13.59 3.71 14.21 4.1 14.6L8.29 18.79C8.68 19.18 9.31 19.18 9.7 18.79L20.3 8.20001C20.69 7.81001 20.69 7.19001 20.3 6.80001C19.91 6.41001 19.29 6.41001 18.9 6.80001L9 16.7Z" fill="#4C4C4C"/>
                                                </svg>
                                            </button>
                                            <button className="action-btn cancel" onClick={cancelAdd}>
                                            <svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.3 1.20997C12.91 0.819971 12.28 0.819971 11.89 1.20997L7 6.08997L2.11 1.19997C1.72 0.809971 1.09 0.809971 0.700001 1.19997C0.310001 1.58997 0.310001 2.21997 0.700001 2.60997L5.59 7.49997L0.700001 12.39C0.310001 12.78 0.310001 13.41 0.700001 13.8C1.09 14.19 1.72 14.19 2.11 13.8L7 8.90997L11.89 13.8C12.28 14.19 12.91 14.19 13.3 13.8C13.69 13.41 13.69 12.78 13.3 12.39L8.41 7.49997L13.3 2.60997C13.68 2.22997 13.68 1.58997 13.3 1.20997Z" fill="#4C4C4C"/>
                                            </svg>

                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }

                {
                    (type === 'personal' || type === 'home' || type === 'page-todolist') && (
                        <button className="add-todo" onClick={addTodo}>
                            <div className="text-area">
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 8.5H8V13.5C8 14.05 7.55 14.5 7 14.5C6.45 14.5 6 14.05 6 13.5V8.5H1C0.45 8.5 0 8.05 0 7.5C0 6.95 0.45 6.5 1 6.5H6V1.5C6 0.95 6.45 0.5 7 0.5C7.55 0.5 8 0.95 8 1.5V6.5H13C13.55 6.5 14 6.95 14 7.5C14 8.05 13.55 8.5 13 8.5Z"/>
                                </svg>
                                추가하기
                            </div>
                        </button>
                    )
                }
                {
                    (type === 'home' || type === 'group' || type === 'group-detail') && groupTodos.length > 0 && (
                        <div className={`todo-box group-todo-box ${type === 'home' ? 'home-section' : ''}`}>
                            <p className={`day-goal ${type === 'home' ? 'day-goal-home' : ''}`}>
                                그룹 목표 ({groupTodos.filter(item => item.completed).length}/{groupTodos.length})
                            </p>
                            {
                                groupTodos.map((item) => (
                                    <div key={item.id} className="todo-box__item">
                                        <div className="list">
                                            <Checkbox 
                                                checked={item.completed} 
                                                onChange={(checked) => handleCheckboxChange(item, checked, 'group')} 
                                            />
                                            {editingTodoId === item.id && editingTodoType === 'group' ? (
                                                <input 
                                                    type="text" 
                                                    className="title-input" 
                                                    value={editingText}
                                                    onChange={(e) => setEditingText(e.target.value)}
                                                    onKeyDown={handleEditKeyPress}
                                                    autoFocus
                                                />
                                            ) : (
                                                <span className={`title ${item.completed ? 'done' : ''}`}>{item.text}</span>
                                            )}
                                        </div>
                                        {/* {editingTodoId === item.id && editingTodoType === 'group' ? (
                                            <div className="actions">
                                                <button className="action-btn save" onClick={saveEditedTodo}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25">
                                                        <path d="M9 16.7L5.5 13.2C5.11 12.81 4.49 12.81 4.1 13.2C3.71 13.59 3.71 14.21 4.1 14.6L8.29 18.79C8.68 19.18 9.31 19.18 9.7 18.79L20.3 8.20001C20.69 7.81001 20.69 7.19001 20.3 6.80001C19.91 6.41001 19.29 6.41001 18.9 6.80001L9 16.7Z" fill="#4C4C4C"/>
                                                    </svg>
                                                </button>
                                                <button className="action-btn cancel" onClick={cancelEdit}>
                                                    <svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.3 1.20997C12.91 0.819971 12.28 0.819971 11.89 1.20997L7 6.08997L2.11 1.19997C1.72 0.809971 1.09 0.809971 0.700001 1.19997C0.310001 1.58997 0.310001 2.21997 0.700001 2.60997L5.59 7.49997L0.700001 12.39C0.310001 12.78 0.310001 13.41 0.700001 13.8C1.09 14.19 1.72 14.19 2.11 13.8L7 8.90997L11.89 13.8C12.28 14.19 12.91 14.19 13.3 13.8C13.69 13.41 13.69 12.78 13.3 12.39L8.41 7.49997L13.3 2.60997C13.68 2.22997 13.68 1.58997 13.3 1.20997Z" fill="#4C4C4C"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        ) : (
                                            (type !== 'group') && ( // 'group' 타입일 때는 ... 버튼을 숨깁니다.
                                                <div className="more" onClick={() => handleMoreClick(item.id, 'group')}>
                                                    <svg width="16" height="5" viewBox="0 0 16 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2 0.5C0.9 0.5 0 1.4 0 2.5C0 3.6 0.9 4.5 2 4.5C3.1 4.5 4 3.6 4 2.5C4 1.4 3.1 0.5 2 0.5ZM14 0.5C12.9 0.5 12 1.4 12 2.5C12 3.6 12.9 4.5 14 4.5C15.1 4.5 16 3.6 16 2.5C16 1.4 15.1 0.5 14 0.5ZM8 0.5C6.9 0.5 6 1.4 6 2.5C6 3.6 6.9 4.5 8 4.5C9.1 4.5 10 3.6 10 2.5C10 1.4 9.1 0.5 8 0.5Z"/>
                                                    </svg>
                                                </div>
                                            )
                                        )} */}
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
                {/* Only render personal todos or group todos based on type */}
                
            </div>
            <MoreOption
                title = {getSelectedTodo()?.text || '할 일 옵션'}
                options = {[
                    { label: "수정하기", onClick: () => handleEditTodo() },
                    { label: "삭제하기", onClick: () => handleDeleteTodo() },
                ]}
                isOpen={moreOption}
                onClose={closeMoreOption}
            />
        </div>
    )
}
export default TodoList;