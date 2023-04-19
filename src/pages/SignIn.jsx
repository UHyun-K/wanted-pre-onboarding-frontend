import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../libs/useAuth";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router-dom";

//로그인 기능
export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({
        loginMessage: "",
        login: false,
    });
    const navigate = useNavigate();
    const { setAccessToken } = useAuth();

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
                if (data.statusCode >= 400) {
                    setMessage({
                        login: false,
                        loginMessage: "로그인에 실패하였습니다.",
                    });
                    return;
                }
                //정상
                const accessToken = data.access_token;
                localStorage.setItem("loginToken", accessToken);
                setAccessToken(accessToken);
                setMessage({
                    loginMessage: "로그인 성공",
                    login: true,
                });
                navigate("/todo");
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <Form title="로그인" onSubmit={handleSubmit}>
                <Input
                    label="이메일"
                    name="email"
                    dataTestId="email-input"
                    onChange={onEmailChnage}
                    value={email}
                    requried
                />

                <Input
                    label="비밀번호"
                    name="password"
                    dataTestId="password-input"
                    onChange={onPasswordChange}
                    required
                />
                <Button
                    dataTestId="signin-button"
                    type="submit"
                    text="로그인"
                />
                <ErrorMessage
                    condition={!message.login}
                    message={message.loginMessage}
                />
            </Form>
            <div className="text-left m-3 pl-1">
                <Link to="/signup">회원가입하기-></Link>
            </div>
        </div>
    );
}
