import Navbar from "../../components/navbar/Navbar";
import Field from "../../components/field/Field";
import Toast from "../../components/toast/Toast";
import Loading from "../../components/loading/Loading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const usernameRegex = /^[a-z0-9_\.]+$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex = /^\+[0-9]{7,14}$/;
const nameRegex = /^[a-z ,.'-]+$/i;

function Register() {
  const [isAuth, setIsAuth] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    document.title = "Register";
    if (localStorage.getItem("token")) {
      setIsAuth(true);
      setId(Number(localStorage.getItem("id")));
      setAdmin(localStorage.getItem("admin") === "true");
    } else {
      setIsAuth(false);
    }
  }, [isAuth, admin]);

  const [loading, setLoading] = useState(false);
  const [showToastTrue, setShowToastTrue] = useState(false);
  const [showToastError, setShowToastError] = useState(false);
  const [msg, setMsg] = useState("");

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isFirstNameValid, setIsFirstNameValid] = useState<boolean>(false);
  const [isLastNameValid, setIsLastNameValid] = useState<boolean>(false);

  const [usernameErrorMsg, setUsernameErrorMsg] = useState<string>("");
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] =
    useState<string>("");
    const navigate = useNavigate();
  useEffect(() => {
    if (username == "" || usernameRegex.test(username)) {
      setIsUsernameValid(true);
      setUsernameErrorMsg("");
    } else {
      setIsUsernameValid(false);
      setUsernameErrorMsg("Username format is incorrect");
    }
  }, [username]);

  useEffect(() => {
    if (email == "" || emailRegex.test(email)) {
      setIsEmailValid(true);
      setEmailErrorMsg("");
    } else {
      setIsEmailValid(false);
      setEmailErrorMsg("Email format is incorrect");
    }
  }, [email]);

  useEffect(() => {
    if (phone == "" || phoneRegex.test(phone)) {
      setIsPhoneValid(true);
    } else {
      setIsPhoneValid(false);
    }
  }, [phone]);

  useEffect(() => {
    password == "" || password.length >= 6
      ? setIsPasswordValid(true)
      : setIsPasswordValid(false);
  }, [password]);

  useEffect(() => {
    setConfirmPasswordErrorMsg("");
  }, [confirmPassword]);

  useEffect(() => {
    firstName == "" || nameRegex.test(firstName)
      ? setIsFirstNameValid(true)
      : setIsFirstNameValid(false);
  }, [firstName]);

  useEffect(() => {
    lastName == "" || nameRegex.test(lastName)
      ? setIsLastNameValid(true)
      : setIsLastNameValid(false);
  }, [lastName]);

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    if (
      !isUsernameValid ||
      !isEmailValid ||
      !isPhoneValid ||
      !isPasswordValid ||
      !isFirstNameValid ||
      !isLastNameValid
    ) {
      alert("Please fill the form correctly");
      return;
    }

    if (password != confirmPassword) {
      setConfirmPasswordErrorMsg("Password doesn't match");
      return;
    } else {
      setConfirmPasswordErrorMsg("");
    }

    const url = import.meta.env.VITE_REST_URL;

    try {
      const res = await fetch(`${url}/check/username/${username}`);
      const data = await res.json();
      if (res.ok && data.code == 1) {
        setIsUsernameValid(false);
        setUsernameErrorMsg(data.message);
        return;
      }
    } catch (error) {
      console.error("Error fetching username", error);
    }

    try {
      const res = await fetch(`${url}/check/email/${email}`);
      const data = await res.json();
      if (res.ok && data.code == 1) {
        setIsEmailValid(false);
        setEmailErrorMsg(data.message);
        return;
      }
    } catch (error) {
      console.error("Error fetching email", error);
    }

    try {
      const res = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          phone: phone,
          password: password,
          firstName: firstName,
          lastName: lastName,
        }),
      });

      if (res.status == 201) {
        setLoading(true);
        setShowToastTrue(true);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setShowToastError(true);
        setMsg("Error registering");
      }
    } catch (error) {
      console.error("Error registering", error);
    }
  };

  function gotoAdmin() {
   navigate("/film-request") 
  }

  function gotoUser() {
    navigate("/submission/" + id)
  }

  return (
    <>
      {!isAuth ? (
        <>
          <Toast
            type="check"
            message="Sucesfully updated film"
            showUseState={showToastTrue}
          />
          <Toast type="cross" message={msg} showUseState={showToastError} />
          <Navbar />
          {loading && <Loading />}
          <div className="flex justify-center min-h-screen items-center pt-12">
            <form className="flex-row items-center w-64">
              <h1 className="text-center">Sign Up</h1>
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
                type="email"
                label="Email"
                htmlFor="email"
                required
                placeholder="john_doe@email.com"
                errorMessage={emailErrorMsg}
                onChangeHandler={(event) => setEmail(event.target.value)}
              />
              <Field
                type="text"
                label="Phone Number"
                htmlFor="phone-number"
                required
                placeholder="+621234567890"
                errorMessage={
                  isPhoneValid ? "" : "Phone number format is incorrect"
                }
                onChangeHandler={(event) => setPhone(event.target.value)}
              />
              <div className="flex gap-2">
                <Field
                  type="text"
                  label="First Name"
                  htmlFor="first-name"
                  required
                  placeholder="John"
                  errorMessage={
                    isFirstNameValid ? "" : "First Name format is incorrect"
                  }
                  half={true}
                  onChangeHandler={(event) => setFirstName(event.target.value)}
                />
                <Field
                  type="text"
                  label="Last Name"
                  htmlFor="last-name"
                  required
                  placeholder="Doe"
                  errorMessage={
                    isLastNameValid ? "" : "Last Name format is incorrect"
                  }
                  half={true}
                  onChangeHandler={(event) => setLastName(event.target.value)}
                />
              </div>
              <Field
                type="password"
                label="Password"
                htmlFor="password"
                errorMessage={
                  isPasswordValid
                    ? ""
                    : "Password must be at least 6 characters"
                }
                required
                onChangeHandler={(event) => setPassword(event.target.value)}
              />
              <Field
                type="password"
                label="Confirm Password"
                htmlFor="confirm-password"
                errorMessage={confirmPasswordErrorMsg}
                required
                onChangeHandler={(event) =>
                  setConfirmPassword(event.target.value)
                }
              />
              <div className="w-ful flex justify-center mt-4 mb-2">
                <button
                  className="button-red red-glow button-text"
                  type="submit"
                  name="register"
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </div>
              <div className="small-text text-center">
                Already have an account? <a href="/login">Login</a>
              </div>
            </form>
          </div>
        </>
      ) : admin ? (
        gotoAdmin()
      ) : (
       gotoUser()
      )}
    </>
  );
}

export default Register;
