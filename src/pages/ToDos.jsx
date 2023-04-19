import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../libs/useAuth";
import ToDoItem from "../components/toDo/ToDoItem";
import { getToDosApi } from "../api/todoApi";
import ToDoEnter from "../components/toDo/ToDoEnter";

export default function ToDos() {
    const [toDos, setToDos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { accessToken } = useAuth();

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
    useEffect(() => {
        getToDosApi();
        setIsLoading(false);
    }, []);
    return (
        <div className="mt-16 px-4 ">
            <h1 className="text-3xl font-bold text-center">To Do List</h1>

            {isLoading ? (
                "Loading..."
            ) : (
                <div>
                    <ul className="flex flex-col mt-12 space-y-4">
                        {toDos &&
                            toDos.map(({ todo, id, isCompleted }) => (
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
                        <ToDoEnter
                            accessToken={accessToken}
                            setToDos={setToDos}
                            getToDosApi={getToDosApi}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
