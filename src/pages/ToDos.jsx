import React, { useRef, useState } from "react";
import { useAuth } from "../libs/useAuth";

export default function ToDos() {
    const [toDos, setToDos] = useState([]);
    const [toDo, setToDo] = useState("");
    const inputRef = useRef();
    const { accessToken } = useAuth();
    const handleValid = (e) => {
        e.preventDefault();
        if (toDo === " ") return;
        setToDos((oldToDos) => [...oldToDos, { text: toDo, id: Date.now() }]);
        createToDoApi(toDo);
        setToDo("");
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
        }).then((res) => console.log(res));
    };

    const onChange = (e) => {
        const {
            currentTarget: { value },
        } = e;
        setToDo(value);
    };
    return (
        <div>
            <ul>
                <li>
                    <label>
                        <input type="checkbox" />
                        <span>TODO 1</span>
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox" />
                        <span>TODO 2</span>
                    </label>
                </li>
                {toDos?.map(({ text, id }) => (
                    <li key={id}>
                        <label>
                            <input type="checkbox" />
                            <span>{text}</span>
                        </label>
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
    );
}
