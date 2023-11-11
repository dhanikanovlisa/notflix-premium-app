import Navbar from "../../components/navbar/Navbar"
import Toast from "../../components/toast/Toast"
import Field from "../../components/field/Field"
import { useEffect, useState } from "react"


function Login() {

  useEffect(() => {
    document.title = "Log In"
  })

  
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [usernameErrorMsg, setUsernameErrorMsg] = useState<string>("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("");
  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [showToastError, setShowToastError] = useState(false);


  useEffect(() => {
    setUsernameErrorMsg("");
  }, [username]);

  useEffect(() => {
    setPasswordErrorMsg("");
  }, [password]);

  const handleSubmit = async(e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const url = import.meta.env.VITE_REST_URL;

    try {
      const res = await fetch(`${url}/check/username/${username}`);
      const data = await res.json();
      if (res.ok && data.code == 0){
        setUsernameErrorMsg(data.message);
        return;
      } 
    } catch (error) {
      console.error('Error fetching username', error);
    }

    try {
      const res = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      });
      
      const data = await res.json();
      if (res.ok && data.code == 1){
        setShowToastSuccess(true);
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          window.location.href = "/";
        }, 1600);
      } else {
        setShowToastError(true);
        setPasswordErrorMsg(data.message);
        return;
      }

    } catch (error) {
      console.error('Error logging in', error);
    }

  }

    return (
      <>
        <Toast showUseState={showToastSuccess} message="Login successful" type="check" />
        <Toast showUseState={showToastError} message="Login failed" type="cross" />
        <Navbar />
        <div className="flex justify-center min-h-screen items-center">
          <div className="flex-row items-center w-64">
            <h1 className="text-center">Log In</h1>
            <Field 
              type="text"
              label="Username" 
              htmlFor="username"
              required
              placeholder="john_doe"
              errorMessage={usernameErrorMsg}
              onChangeHandler={event => setUsername(event.target.value)}
            />
            <Field 
              type="password"
              label="Password"
              htmlFor="password"
              required
              errorMessage={passwordErrorMsg}
              onChangeHandler={event => setPassword(event.target.value)}
            />
            <div className='w-ful flex justify-center mt-4 mb-2'><button className="button-red red-glow button-text" type="submit" name="login" onClick={handleSubmit}>Login</button></div>
            <div className="small-text text-center">Already have an account? <a href="/registration">Register</a></div>
          </div>
        </div>
      </>
    )
  };
  
  export default Login
  