import Navbar from "../../components/navbar/Navbar";
import Toast from "../../components/toast/Toast";
import Field from "../../components/field/Field";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import { useAuth } from "../../hooks/useAuth";
import { getAPI } from "../../utils/api";

function Login() {
  const [id, setId] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authenticate, isAuthenticated] = useState(false);

  const [usernameErrorMsg, setUsernameErrorMsg] = useState<string>("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("");
  const toastSuccessUseState = useState(false);
  const [showToastSuccess, setShowToastSuccess] = toastSuccessUseState;
  const toastErrorUseState = useState(false);
  const [showToastError, setShowToastError] = toastErrorUseState;
  const [toastErrorMsg, setToastErrorMsg] = useState("");

  const [loading, setLoading] = useState(false);

  const {isAuth, isAdmin, login } = useAuth();

  useEffect(() => {
    setId(Number(localStorage.getItem("id")));
    if (isAuth()) {
      isAuthenticated(true);
      if (isAdmin()) {
        window.location.href = "/film-request";
      } else {
        window.location.href = `/submission/${id}`;
      }
    }
  }, [isAuth, isAdmin]);


  useEffect(() => {
    setUsernameErrorMsg("");
  }, [username]);

  useEffect(() => {
    setPasswordErrorMsg("");
  }, [password]);

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();    
    if(username === "") {
      setLoading(false);
      setShowToastError(true);
      setUsernameErrorMsg("Username cannot be empty");
      return;
    }
    if(password === "") {
      setToastErrorMsg("Password cannot be empty");
      setPasswordErrorMsg("Password cannot be empty");
      return;
    }
    if(password.length < 6) {
      setToastErrorMsg("Password must be at least 6 characters");
      setPasswordErrorMsg("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const res =  await getAPI(`check/username/${username}`);
      const data = await res.json();
      if (res.ok && data.code == 0) {
        setLoading(false);
        setUsernameErrorMsg(data.message);
        return;
      }
    } catch (error) {
      console.error("Error fetching username", error);
    }

    try {
      const loginResult = await login(username, password);
      if (loginResult.success) {
        setShowToastSuccess(true);
        setToastErrorMsg("Succes");
        setTimeout(() => {
          if (loginResult.isAdmin) {
            window.location.href = "/film-request";
          } else {
            window.location.href = `/submission/${loginResult.id}`;
          }
        }, 1600);
        
      } else {
        setLoading(false);
        setShowToastError(true);
        setToastErrorMsg(loginResult.message);
      }
    } catch (error) {
      console.error("Error logging in", error);
      setLoading(false);
      setShowToastError(true);
      setToastErrorMsg("Login failed. Please check your credentials.");
    }

  };

  return (
    <>
      {!authenticate && (
        <>
          <Toast
            showUseState={toastSuccessUseState}
            message={toastErrorMsg}
            type="check"
          />
          <Toast
            showUseState={toastErrorUseState}
            message={toastErrorMsg}
            type="cross"
          />
          <Navbar />
          <div className="flex justify-center min-h-screen items-center">
          {loading && <Loading />}
            <div className="flex-row items-center w-64">
              <h1 className="text-center">Log In</h1>
              <Field
                type="text"
                label="Username"
                htmlFor="username"
                required
                placeholder="john_doe"
                errorMessage={usernameErrorMsg}
                onChangeHandler={(event) => setUsername(event.target.value)}
              />
              <Field
                type="password"
                label="Password"
                htmlFor="password"
                required
                errorMessage={passwordErrorMsg}
                onChangeHandler={(event) => setPassword(event.target.value)}
              />
              <div className="w-ful flex justify-center mt-4 mb-2">
                <button
                  className="button-red red-glow button-text"
                  type="submit"
                  name="login"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>
              <div className="small-text text-center">
                Already have an account? <a href="/registration"><u>Register</u></a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Login;
