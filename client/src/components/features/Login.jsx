import '../../styles/Login.css'
import { useState, useRef } from 'react'
import axios from 'axios';

function Login(){

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
    const auth = async (LoS) => {
        let username = usernameRef.current.value;
        let userPassword = passwordRef.current.value;
        if(!username || username.includes(" ")){
            username = "Invalid";
            setUserName("Invalid");
        }
        else{
            setUserName(username);
        }
        if(!userPassword|| userPassword.includes(" ")){
            userPassword = "Invalid";
            setpassword("Invalid");
        }
        else{
            setpassword(userPassword);
        }

        if(LoS === 1){
            if(username !== "Invalid" && userPassword !== "Invalid"){
                try{
                    const res = await axios.post('http://localhost:5000/api/auth/login', { userName: username, password: userPassword }, { withCredentials: true });
                        if (res.data.message === "Login successful") {
                            console.log("✅ Login success!");
                            const user = await axios.get("http://localhost:5000/api/users/me", { withCredentials: true });
                            console.log(user.data);
                        } else {
                            console.log("Login failed:", res.data.message);
                            }
                }catch(error){
                    console.log("error", error)
                }
            }
        }else{
            if(username !== "Invalid" && userPassword !== "Invalid"){
                try{
                    
                    const user = await axios.post('http://localhost:5000/api/users', { userName: username, password: userPassword }, { withCredentials: true });
                    setState("Login");
                }catch(error){
                    if (error.response?.status === 409) {
                        alert("Username already taken!");
                    }
                    console.log("error", error)
                }
            }   
        }   
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

                {(State === "Login" && <button className = "login-page-sign-up" onClick = { () => auth(1)}>Sign In</button>)}
                {(State === "SignUp" && <button className = "login-page-sign-up" onClick = { () => auth(2)}>Sign Up</button>)}

                <span className = "login-page-options-divider"></span>
                {(State === "Login" && <div onClick = { () => setState("SignUp")}>Don't Have an Account?</div>)}
                {(State === "SignUp" && <div onClick = { () => setState ( "Login")}>Already? Have an Account?</div>)}
            </div>
        </div>
    )
}

export { Login }