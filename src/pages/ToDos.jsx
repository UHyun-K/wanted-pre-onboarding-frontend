import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../libs/useAuth";

export default function ToDos() {
    const [toDos, setToDos] = useState([]);
    const [toDo, setToDo] = useState("");
    /*     const [checkedList, setCheckedList] = useState([]); */
    /*   const [isChecked, setIsChecked] = useState(false); */
    const inputRef = useRef();

    /*     const checkedItemHandler = (id, isChecked, todo) => {
        if (isChecked) {
            setCheckedList((prev) => [...prev, id]);
            return;
        }
        if (!isChecked && checkedList.includes(id)) {
            setCheckedList(checkedList.filter((item) => item !== id));
            return;
        }
        updateTodo(id, todo, isChecked);
    }; */
    const checkHandler = (id, event, todo) => {
        /*  setIsChecked(!isChecked); */
        /*     checkedItemHandler(id, event.target.checked, todo); */
        updateTodo(id, todo, event.target.checked);
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
    };

    return (
        <>
            {/*      <h3>완료 :{checkedList.length}</h3> */}
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
