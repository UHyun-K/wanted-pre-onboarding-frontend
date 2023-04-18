export const createToDoApi = (todo, accessToken) => {
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

export const updateTodoApi = (id, todo, isCompleted, accessToken) => {
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
export const deleteTodoApi = (id, accessToken) => {
    fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};
