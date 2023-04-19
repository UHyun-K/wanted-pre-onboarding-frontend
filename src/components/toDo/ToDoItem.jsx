import React, { useEffect, useState } from "react";
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
        <li key={id}>
            <input
                type="checkbox"
                checked={isCompleted}
                id="checkbox"
                onChange={(event) => checkHandler(id, event, todo)}
            />

            {isEdit ? (
                <>
                    <form
                        onSubmit={(e) =>
                            handleEditValid(e, id, newToDo, isCompleted)
                        }
                    >
                        <input
                            type="text"
                            data-testid="modify-input"
                            value={newToDo}
                            onChange={onEditChange}
                        />
                        <button type="submit" data-testid="submit-button">
                            확인
                        </button>
                        <button
                            type="button"
                            data-testid="cancel-button"
                            onClick={toggleEditing}
                        >
                            취소
                        </button>
                    </form>
                </>
            ) : (
                <>
                    <label>
                        <span>{todo}</span>
                    </label>

                    <button data-testid="modify-button" onClick={toggleEditing}>
                        수정
                    </button>
                    <button
                        data-testid="delete-button"
                        onClick={() => onDelete()}
                    >
                        삭제
                    </button>
                </>
            )}
        </li>
    );
}
