import axios from 'axios';

//THIS SHIT IS A MESS NEED TO CLEAN UP JESUS

async function Auth (LoS, username, userPassword, setUserName, setpassword, setState, setWindowState, setUser) {
    if(!username || username.includes(" ")){
        username = "Invalid";
        setUserName("Invalid");
    }
    else{
        setUserName(username);
    }
    if(!userPassword || userPassword.includes(" ")){
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
                        setUser(user);
                        setWindowState(["Home", null]);
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


export { Auth }