import Navbar from "../../components/navbar/Navbar"
import Field from "../../components/field/Field"
import { useEffect, useState } from "react";

const usernameRegex = /^[a-z0-9_\.]+$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex = /^\+[0-9]{7,14}$/;
const nameRegex = /^[a-z ,.'-]+$/i;

function Register() {
    useEffect(() => {
      document.title = "Register"
    });

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
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState<boolean>(false);
    const [isFirstNameValid, setIsFirstNameValid] = useState<boolean>(false);
    const [isLastNameValid, setIsLastNameValid] = useState<boolean>(false);

    const [usernameErrorMsg, setUsernameErrorMsg] = useState<string>("");
    const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
    
    useEffect(() => {
      if (username=="" || usernameRegex.test(username)){
        setIsUsernameValid(true);
        setUsernameErrorMsg("");
      } else {
        setIsUsernameValid(false);
        setUsernameErrorMsg("Username format is incorrect");
      }
    }, [username]);

    useEffect(() => {
      if (email=="" || emailRegex.test(email)){
        setIsEmailValid(true);
        setEmailErrorMsg("");
      } else {
        setIsEmailValid(false);
        setEmailErrorMsg("Email format is incorrect");
      }
    }, [email]);

    useEffect(() => {
      if (phone=="" || phoneRegex.test(phone)){
        setIsPhoneValid(true);
      } else {
        setIsPhoneValid(false);
      }
    }, [phone]);

    useEffect(() => {
      password=="" || password.length>=6? setIsPasswordValid(true):setIsPasswordValid(false);
    }, [password]);

    useEffect(() => {
      confirmPassword=="" || confirmPassword==password? setIsConfirmPasswordValid(true):setIsConfirmPasswordValid(false);
    }, [confirmPassword, password]);

    useEffect(() => {
      firstName=="" || nameRegex.test(firstName)? setIsFirstNameValid(true):setIsFirstNameValid(false);
    }, [firstName]);

    useEffect(() => {
      lastName=="" || nameRegex.test(lastName)? setIsLastNameValid(true):setIsLastNameValid(false);
    }, [lastName]);

    return (
      <>
        <Navbar />
        <div className="flex justify-center min-h-screen items-center pt-12">
          <div className="flex-row items-center w-64">
            <h1 className="text-center">Sign Up</h1>
            <Field 
              type="text"
              label="Username" 
              htmlFor="username"
              required
              placeholder="john_doe" 
              errorMessage={isUsernameValid? "":"Username format is incorrect"}
              onChangeHandler={event => setUsername(event.target.value)}
            />
            <Field 
              type="email"
              label="Email" 
              htmlFor="email"
              required
              placeholder="john_doe@email.com" 
              errorMessage={isEmailValid? "":"Email format is incorrect"}
              onChangeHandler={event => setEmail(event.target.value)}
            />
            <Field 
              type="text"
              label="Phone Number" 
              htmlFor="phone-number"
              required
              placeholder="+621234567890"
              errorMessage={isPhoneValid? "":"Phone number format is incorrect"}
              onChangeHandler={event => setPhone(event.target.value)}
            />
            <div className="flex gap-2">
              <Field 
                type="text"
                label="First Name"
                htmlFor="first-name" 
                required
                placeholder="John" 
                errorMessage={isFirstNameValid? "":"First Name format is incorrect"}
                half={true}
                onChangeHandler={event => setFirstName(event.target.value)}
              />
              <Field 
                type="text"
                label="Last Name"
                htmlFor="last-name" 
                required
                placeholder="Doe" 
                errorMessage={isLastNameValid? "":"Last Name format is incorrect"}
                half= {true}
                onChangeHandler={event => setLastName(event.target.value)}
              />
            </div>
            <Field 
              type="password"
              label="Password" 
              htmlFor="password"
              errorMessage={isPasswordValid? "":"Password must be at least 6 characters"}
              required
              onChangeHandler={event => setPassword(event.target.value)}
            />
            <Field 
              type="password"
              label="Confirm Password" 
              htmlFor="confirm-password"
              errorMessage={isConfirmPasswordValid? "":"Password does not match"}
              required
              onChangeHandler={event => setConfirmPassword(event.target.value)}
            />
            <div className='w-ful flex justify-center mt-4 mb-2'><button className="button-red red-glow button-text" type="submit" name="login">Login</button></div>
            <div className="small-text text-center">Already have an account? <a href="/login">Login</a></div>
          </div>
        </div>
      </>
    )
  }
  
export default Register
  