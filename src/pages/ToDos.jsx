import React from "react";

export default function ToDos() {
    return (
        <div>
            <li>
                <label>
                    <input type="checkbox" data-testid="new-todo-input" />
                    <span>TODO 1</span>
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" />
                    <span>TODO 2</span>
                </label>
            </li>

            <button data-testid="new-todo-add-button">추가</button>
        </div>
    );
}
