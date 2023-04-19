import React, { useState, useRef } from "react";
import { updateTodoApi, deleteTodoApi } from "../../api/todoApi";
export default function ToDoItem({
    todo,
    id,
    isCompleted,
    accessToken,
    setToDos,
}) {
    const [isEdit, setIsEdit] = useState(false);
    const [newToDo, setNewToDo] = useState(todo);
    const inputRef = useRef();
    const toggleEditing = () => {
        setIsEdit((prev) => !prev);
    };
    const onEditChange = (e) => {
        const {
            currentTarget: { value },
        } = e;
        setNewToDo(value);
    };
    const checkHandler = (id, event, todo) => {
        updateTodoApi(id, todo, event.target.checked, accessToken);
    };
    const handleEditValid = (e, id, newToDo, isCompleted) => {
        e.preventDefault();
        updateTodoApi(id, newToDo, isCompleted, accessToken);

        setToDos((todos) =>
            todos.map((todo) => (todo.id === id ? { todo: newToDo } : todo))
        );
        toggleEditing();
    };

    const onDelete = () => {
        deleteTodoApi(id, accessToken);
        setToDos((pre) => {
            return [...pre].filter((list) => {
                return list.id !== id;
            });
        });
    };

    return (
        <li key={id} className="flex relative">
            <input
                type="checkbox"
                checked={isCompleted}
                id={id}
                onChange={(event) => checkHandler(id, event, todo)}
            />

            {isEdit ? (
                <>
                    <form
                        onSubmit={(e) =>
                            handleEditValid(e, id, newToDo, isCompleted)
                        }
                        className="flex"
                    >
                        <input
                            type="text"
                            data-testid="modify-input"
                            value={newToDo}
                            onChange={onEditChange}
                            ref={inputRef}
                            className="mx-2 border-3 ring-2 ring-orange-200"
                        />
                        <div className="absolute right-0 space-x-2">
                            <button
                                type="submit"
                                data-testid="submit-button"
                                className="bg-orange-200 px-2 rounded"
                            >
                                확인
                            </button>
                            <button
                                type="button"
                                data-testid="cancel-button"
                                onClick={toggleEditing}
                                className="bg-orange-200 px-2 rounded"
                            >
                                취소
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <label htmlFor={id}>
                        <span className="mx-2">{todo}</span>
                    </label>

                    <div className="absolute right-0 space-x-2">
                        <button
                            data-testid="modify-button"
                            onClick={toggleEditing}
                            className="bg-orange-200 px-2 rounded"
                        >
                            수정
                        </button>
                        <button
                            data-testid="delete-button"
                            onClick={() => onDelete()}
                            className="bg-orange-200 px-2 rounded"
                        >
                            삭제
                        </button>
                    </div>
                </>
            )}
        </li>
    );
}
