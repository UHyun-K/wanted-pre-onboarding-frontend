import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../libs/useAuth";
import ToDoItem from "../components/toDo/ToDoItem";
import { createToDoApi } from "../api/todoApi";

export default function ToDos() {
    const [toDos, setToDos] = useState([]);
    const [toDo, setToDo] = useState("");

    const inputRef = useRef();

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
        createToDoApi(toDo, accessToken);
        setToDo("");
        getToDosApi();
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

    return (
        <>
            <div>
                <ul>
                    {toDos?.map(({ todo, id, isCompleted }) => (
                        <ToDoItem
                            todo={todo}
                            id={id}
                            isCompleted={isCompleted}
                            accessToken={accessToken}
                            setToDos={setToDos}
                        />
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
