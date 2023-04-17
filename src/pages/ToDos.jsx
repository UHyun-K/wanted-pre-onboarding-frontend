import React, { useRef, useState } from "react";

export default function ToDos() {
    const [toDos, setToDos] = useState([]);
    const [toDo, setToDo] = useState("");
    const inputRef = useRef();
    console.log("toDos:", toDos);
    const handleValid = (e) => {
        e.preventDefault();
        setToDos((oldToDos) => [{ text: toDo, id: Date.now() }, ...oldToDos]);
        setToDo("");
    };
    const onChange = (e) => {
        const {
            currentTarget: { value },
        } = e;
        setToDo(value);
    };
    return (
        <div>
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
