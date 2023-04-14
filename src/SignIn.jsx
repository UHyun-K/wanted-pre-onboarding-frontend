import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

//로그인 기능
export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({
        loginMessage: "",
        login: false,
    });
    const navigate = useNavigate();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://www.pre-onboarding-selection-task.shop/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                //오류시
                console.log("data:", data);
                if (data.statusCode >= 400) {
                    setMessage({
                        login: false,
                        loginMessage: data.message,
                    });
                    return;
                }
                //정상
                localStorage.setItem("loginToken", data.access_token);
                navigate("/todo");
                setMessage({
                    loginMessage: "로그인 성공",
                    login: true,
                });
            })
            .catch((error) => console.log(error));
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
