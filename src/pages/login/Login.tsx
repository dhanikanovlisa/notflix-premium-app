import Navbar from "../../components/navbar/Navbar";
import Toast from "../../components/toast/Toast";
import Field from "../../components/field/Field";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";

function Login() {

  const [isAuth, setIsAuth] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [id, setId] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [usernameErrorMsg, setUsernameErrorMsg] = useState<string>("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("");
  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [showToastError, setShowToastError] = useState(false);
  const [toastErrorMsg, setToastErrorMsg] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Log In";
    if (localStorage.getItem("token")) {
      setShowToastError(true);
      setToastErrorMsg("You've already logged in");
      setIsAuth(true);
      setId(Number(localStorage.getItem("id")));
      setAdmin(localStorage.getItem("admin") === "true");
    } else {
      setIsAuth(false);
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) {
      if (admin) {
        window.location.href = "/film-request";
      } else {
        window.location.href = `/submission/${id}`;
      }
    }
  }, [isAuth]);


  useEffect(() => {
    setUsernameErrorMsg("");
  }, [username]);

  useEffect(() => {
    setPasswordErrorMsg("");
  }, [password]);

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const url = import.meta.env.VITE_REST_URL;

    try {
      const res = await fetch(`${url}/check/username/${username}`);
      const data = await res.json();
      if (res.ok && data.code == 0) {
        setUsernameErrorMsg(data.message);
        return;
      }
    } catch (error) {
      console.error("Error fetching username", error);
    }

    try {
      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && res.status == 200) {
        setLoading(true);
        setShowToastSuccess(true);
        localStorage.setItem("token", data.token);
        localStorage.setItem("admin", data.is_admin);
        localStorage.setItem("id", data.id);
        setTimeout(() => {
          if (data.is_admin) {
            window.location.href = "/film-request";
          } else {
            window.location.href = `/submission/${data.id}`;
          }
        }, 1600);
      } else {
        setShowToastError(true);
        setToastErrorMsg("Log In Failed");
        setPasswordErrorMsg(data.message);
        return;
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <>
      {!isAuth && (
        <>
          <Toast
            showUseState={showToastSuccess}
            message="Login successful"
            type="check"
          />
          <Toast
            showUseState={showToastError}
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
