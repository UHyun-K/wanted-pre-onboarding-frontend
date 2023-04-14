import React, { useState } from "react";
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
        return null;
    };

    return (
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
            {email.length > 0 && !isEmail ? <span>{emailMessage} </span> : null}
            <label htmlFor="password">비밀번호</label>
            <input
                data-testid="password-input"
                id="password"
                type="password"
                onChange={onPasswordChange}
                required
            />
            {password.length > 0 && !isPassword ? (
                <span>{passwordMessage}</span>
            ) : null}
            <button
                data-testid="signup-button"
                type="submit"
                disabled={!(isEmail && isPassword)}
            >
                다음
            </button>
        </form>
    );
}
