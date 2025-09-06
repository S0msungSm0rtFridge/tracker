import { Auth } from "../features/Auth";
import { useState, useRef, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import '../../styles/Login.css'
import { useAuth } from "../wrappers/AuthProvider";

function Authpage(){
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [userName, setUserName] = useState(false);
    const [password, setpassword] = useState(false);
    const [succes, setSuccess] = useState(false);

    const { refreshUser, setUser } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (succes) {
            navigate("/home");
        }
    }, [succes,navigate]);
    const Error = () => {
        return (
            <div className = "login-page-error-statement">Invalid</div>
        )
    }

    const handleAuth = async (mode) => {
        const result = await Auth(
            mode,
            usernameRef.current.value,
            passwordRef.current.value,
            setUserName,
            setpassword,
            navigate,
            setUser
            );
        if (result === "success") {
            await refreshUser();
            setSuccess(true);
        }else{
            alert("incorrect username or password");
        }
    };

    const LoginForm = () => (
        <>
            <h2>Sign In</h2>

            <input
            type="text"
            ref={usernameRef}
            placeholder="Enter your username"
            className="login-page-username-input"
            />

            {userName === "Invalid" && <Error />}

            <input
            type="password"
            ref={passwordRef}
            placeholder="Enter your password"
            className="login-page-password-input"
            />

            {password === "Invalid" && <Error />}

            <button onClick={() => handleAuth(1)} className="login-page-sign-up">Sign In</button>
            <div onClick={() => navigate("/auth/signup")}>Don't Have an Account?</div>
        </>
    );

    const SignUpForm = () => (
        <>
            <h2>Sign Up</h2>

            <input
            type="text"
            ref={usernameRef}
            placeholder="Enter your username"
            className="login-page-username-input"
            />

            {userName === "Invalid" && <Error />}

            <input
            type="password"
            ref={passwordRef}
            placeholder="Enter your password"
            className="login-page-password-input"
            />

            {password === "Invalid" && <Error />}

            <button onClick={() => handleAuth(2)} className="login-page-sign-up">Sign Up</button>
            <div onClick={() => navigate("/auth/login")}>Already Have an Account?</div>
        </>
    );

    return (
        <div className="login-page-default">
            <div className="login-page-side-logo"></div>
            <div className="login-page-middle-divider"></div>
            <div className="login-page-options">
            <Routes>
                <Route path="login" element={<LoginForm />} />
                <Route path="signup" element={<SignUpForm />} />
                <Route path="*" element={<Navigate to="login" replace />} />
                
            </Routes>
            </div>
        </div>
    );

}

export { Authpage }