import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage"
export default function SignUp() {
    //이메일, 비밀번호 확인
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //오류메세지 상태저장
    const [emailMessage, setEmailMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    //유효성검사
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    //제출확인
    const [message, setMessage] = useState({
        registerMessage: "",
        register: false,
    });
    const navigate = useNavigate();
    const onEmailChnage = (event) => {
        const emailRegex = /^[a-zA-Z0-9]+@+[a-z].*$/;
        const {
            currentTarget: { value },
        } = event;
        setEmail(value);
        if (!emailRegex.test(email)) {
            setEmailMessage("@를 포함하여 입력해주세요.");
            setIsEmail(false);
        } else {
            setIsEmail(true);
        }
    };
    //비밀번호
    const onPasswordChange = (event) => {
        const passwordRegex = /^\w{8,}$/;
        const {
            currentTarget: { value },
        } = event;
        setPassword(value);

        if (!passwordRegex.test(password)) {
            setPasswordMessage("8자 이상 입력해주세요.");
            setIsPassword(false);
        } else {
            setIsPassword(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("https://www.pre-onboarding-selection-task.shop/auth/signup", {
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
                console.log("data:", data);
                if (data.statusCode >= 400) {
                    setEmailMessage({
                        registerMessage: data.message,
                        register: false,
                    });
                }
                setMessage({
                    registerMessage: "회원가입성공",
                    register: true,
                });
                navigate("/signin");
            })
            .catch((error) => console.log(error));
    };

    return (
        <Form title="회원가입 " onSubmit={handleSubmit}>
     
                <Input
                    label="이메일"
                    name="email"
                    dataTestId="email-input"
                    onChange={onEmailChnage}
                    value={email}
                    requried
                >
                    <ErrorMessage condition={email.length > 0 && !isEmail }message={emailMessage}/>
                </Input>
                
                <Input
                    label="비밀번호"
                    name="password"
                    dataTestId="password-input"
                    onChange={onPasswordChange}
                    required
                >
                   <ErrorMessage condition={password.length > 0 && !isPassword }message={passwordMessage}/>
                </Input>
  
                <Button
                    dataTestId="signup-button"
                    type="submit"
                    disabled={!(isEmail && isPassword)}
                    text="다음"
                />
            </Form>
    
    );
}
