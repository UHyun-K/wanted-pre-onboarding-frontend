import { createToDoApi, getToDosApi } from "../../api/todoApi";
import React, { useRef, useState } from "react";
import Button from "../Button";
export default function ToDoEnter({ accessToken }) {
    const [toDo, setToDo] = useState("");
    const inputRef = useRef();

    const handleValid = (e) => {
        e.preventDefault();
        if (toDo === " ") return;
        createToDoApi(toDo, accessToken);
        setToDo("");
        getToDosApi(accessToken);
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
