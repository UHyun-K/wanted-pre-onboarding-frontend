import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../libs/useAuth";

export default function ToDos() {
    const [toDos, setToDos] = useState([]);
    const [toDo, setToDo] = useState("");
    const [checkedList, setCheckedList] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const inputRef = useRef();

    const checkedItemHandler = (id, isChecked) => {
        if (isChecked) {
            setCheckedList((prev) => [...prev, id]);
            return;
        }
        if (!isChecked && checkedList.includes(id)) {
            setCheckedList(checkedList.filter((item) => item !== id));
            return;
        }
    };
    const checkHandler = (event, id) => {
        setIsChecked(!isChecked);
        checkedItemHandler(id, event.target.checked);
    };

    const { accessToken } = useAuth();
    useEffect(() => {
        getToDosApi();
    }, [toDos]);
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
    const updateTodo = (id, todo, isCompleted) => {
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
        /*   .then((res) => res.json())
            .then((data) => {
                setToDos(data);
            }); */
    };
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(checkedList);
    };

    return (
        <>
            <h3>완료 :{checkedList.length}</h3>
            <form onSubmit={onSubmit}>
                <ul>
                    {toDos?.map(({ todo, id }) => (
                        <li key={id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checkedList.includes(id)}
                                    onChange={(e) => checkHandler(e, id)}
                                />
                                <span>{todo}</span>
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
            </form>
        </>
    );
}
