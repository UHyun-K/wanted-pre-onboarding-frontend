import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../libs/useAuth";
import ToDoItem from "../components/toDo/ToDoItem";
import { createToDoApi } from "../api/todoApi";
import ToDoEnter from "../components/toDo/ToDoEnter";

export default function ToDos() {
    const [toDos, setToDos] = useState([]);
    const { accessToken } = useAuth();
    useEffect(() => {
        getToDosApi();
    }, []);

    const getToDosApi = async () => {
        await fetch(`https://www.pre-onboarding-selection-task.shop/todos`, {
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
        <div className="mt-16 px-4 ">
            <h1 className="text-3xl font-bold text-center">To Do List</h1>
            <ul className="flex flex-col mt-12 space-y-4">
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
                <ToDoEnter accessToken={accessToken} />
            </div>
        </div>
    );
}
