import { createToDoApi, getToDosApi } from "../../api/todoApi";
import React, { useRef, useState } from "react";

export default function ToDoEnter({ accessToken, setToDos, getToDosApi }) {
    const [toDo, setToDo] = useState("");
    const inputRef = useRef();

    const handleValid = (e) => {
        e.preventDefault();
        if (toDo === " ") return;
        createToDoApi(toDo, accessToken);
        setToDo("");
        getToDosApi();
    };

    const onChange = (e) => {
        const {
            currentTarget: { value },
        } = e;
        setToDo(value);
    };
    return (
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
    );
}
