import Navbar from "../../components/navbar/Navbar"
import Field from "../../components/field/Field"
function Login() {
    return (
      <>
        <Navbar />
        <div className="flex justify-center min-h-screen items-center">
          <div className="flex-row items-center">
            <h1 className="text-center">Log In</h1>
            <Field 
              type="text"
              label="Username" 
              htmlFor="username"
              required
              placeholder="john_doe"
              errorMessage=""
            />
            <Field 
              type="password"
              label="Password"
              htmlFor="password"
              required
              errorMessage=""
            />
            <div className='w-ful flex justify-center mt-4 mb-2'><button className="button-red red-glow button-text" type="submit" name="login">Login</button></div>
            <div className="small-text">Already have an account? <a href="/registration">Register</a></div>
          </div>
        </div>
      </>
    )
  };
  
  export default Login
  