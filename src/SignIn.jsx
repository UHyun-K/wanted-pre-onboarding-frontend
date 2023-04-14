import React, { useState } from "react";

//로그인 기능
export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailChnage = (event) => {
        const {
            currentTarget: { value },
        } = event;
        return setEmail(value);
    };
    const onPasswordChange = (event) => {
        const {
            currentTarget: { value },
        } = event;
        return setPassword(value);
    };
    return (
        <>
            <h1>로그인</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">이메일</label>
                <input
                    data-testid="email-input"
                    id="email"
                    type="email"
                    onChange={onEmailChnage}
                    value={email}
                    required
                />

                <label htmlFor="password">비밀번호</label>
                <input
                    data-testid="password-input"
                    id="password"
                    type="password"
                    onChange={onPasswordChange}
                    required
                />

                <button data-testid="signin-button" type="submit">
                    로그인
                </button>
                {!message.login && <span>{message.loginMessage}</span>}
            </form>
        </>
    );
}
