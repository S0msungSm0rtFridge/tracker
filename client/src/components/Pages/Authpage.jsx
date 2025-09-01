import { Auth } from "../features/Auth";
import { useState, useRef } from 'react'
import '../../styles/Login.css'

function Authpage({setWindowState, setUser}){
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [userName, setUserName] = useState(false);
    const [password, setpassword] = useState(false);

    const [State, setState] = useState("Login")

    const Error = () => {
        return (
            <div className = "login-page-error-statement">Invalid</div>
        )
    }

    return (
        <div className = "login-page-default">
            <div className = "login-page-side-logo"></div>
            <div className = "login-page-middle-divider"></div>
            <div className = "login-page-options">

                {(State === "Login" && <h2>Sign In</h2>) || (State === "SignUp" && <h2>Sign Up</h2>)}

                <textarea className = "login-page-username-input" placeholder="Enter your username" ref = { usernameRef }></textarea>
                {userName === "Invalid" && <Error/>}

                <textarea className = "login-page-password-input" placeholder="Enter your password" ref = { passwordRef }></textarea>
                {password === "Invalid" && <Error/>}

                {(State === "Login" && <button className = "login-page-sign-up" onClick = { () => Auth(1, usernameRef.current.value, passwordRef.current.value, setUserName, setpassword, setState, setWindowState, setUser)}>Sign In</button>)}
                {(State === "SignUp" && <button className = "login-page-sign-up" onClick = { () => Auth(2, usernameRef.current.value, passwordRef.current.value, setUserName, setpassword, setState, setWindowState, setUser)}>Sign Up</button>)}

                <span className = "login-page-options-divider"></span>
                {(State === "Login" && <div onClick = { () => setState("SignUp")}>Don't Have an Account?</div>)}
                {(State === "SignUp" && <div onClick = { () => setState ( "Login")}>Already? Have an Account?</div>)}
            </div>
        </div>
    )
}

export { Authpage }