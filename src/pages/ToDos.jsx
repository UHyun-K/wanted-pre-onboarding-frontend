import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../libs/useAuth";

export default function ToDos() {
    const [toDos, setToDos] = useState([]);
    const [toDo, setToDo] = useState("");

    const inputRef = useRef();

    const checkHandler = (id, event, todo) => {
        updateTodoApi(id, todo, event.target.checked);
    };

    const { accessToken } = useAuth();
    useEffect(() => {
        getToDosApi();
    }, []);
    const onChange = (e) => {
        const {
            currentTarget: { value },
        } = e;
        setToDo(value);
    };
    const handleValid = (e) => {
        e.preventDefault();
        if (toDo === " ") return;
        createToDoApi(toDo);
        setToDo("");
        getToDosApi();
    };
    const createToDoApi = (todo) => {
        fetch(`https://www.pre-onboarding-selection-task.shop/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                todo,
            }),
        });
    };
    const getToDosApi = () => {
        fetch(`https://www.pre-onboarding-selection-task.shop/todos`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setToDos(data);
            });
    };
    const updateTodoApi = (id, todo, isCompleted) => {
        fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                todo,
                isCompleted,
            }),
        });
    };
    const deleteTodoApi = (id) => {
        fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then((resposne) => {
            if (resposne.status !== 204) {
                alert("삭제실패 다시시도해주세요");
            }
        });

        setToDos((pre) => {
            return [...pre].filter((list) => {
                return list.id !== id;
            });
        });
    };

    return (
        <>
            <div>
                <ul>
                    {toDos?.map(({ todo, id, isCompleted }) => (
                        <li key={id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isCompleted}
                                    onChange={(event) =>
                                        checkHandler(id, event, todo)
                                    }
                                />
                                <span>{todo}</span>
                            </label>
                            <button data-testid="modify-button">수정</button>
                            <button
                                data-testid="delete-button"
                                onClick={() => deleteTodoApi(id)}
                            >
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
                <div>
                    <form onSubmit={handleValid}>
                        <input
                            type="text"
                            data-testid="new-todo-input"
                            placeholder="내용을 입력해주세요"
                            value={toDo}
                            ref={inputRef}
                            onChange={onChange}
                        />
                        <button type="submit" data-testid="new-todo-add-button">
                            추가
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
