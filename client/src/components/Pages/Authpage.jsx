import { Login } from "../features/Login"
import { Signup } from "../features/Signup"
function Authpage(){
    return (
        <div className = "login-page-default">
            <div className = "login-page-side-logo"></div>
            <div className = "login-page-middle-divider"></div>
            <div className = "login-page-options">
                <h2>Sign In</h2>
                <textarea className = "login-page-username-input" placeholder="Enter your username" ref = { usernameRef }></textarea>
                {userName === "Invalid" && <Error/>}
                <textarea className = "login-page-password-input" placeholder="Enter your password" ref = { passwordRef }></textarea>
                {passWord === "Invalid" && <Error/>}
                <button className = "login-page-sign-up" onClick = { () => setLogin()}>Sign In</button>
                <span className = "login-page-options-divider"></span>
                <div>Don't Have an Account?</div>
                <button className = "login-page-sign-up">Sign Up</button>
            </div>
        </div>
    )
}