import Navbar from "../../components/navbar/Navbar"
import Field from "../../components/field/Field"

function Register() {

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
              errorMessage=""
            />
            <Field 
              type="email"
              label="Email" 
              htmlFor="email"
              required
              placeholder="john_doe@email.com" 
              errorMessage=""
            />
            <Field 
              type="text"
              label="Phone Number" 
              htmlFor="phone-number"
              required
              placeholder="+621234567890"
              errorMessage=""
            />
            <div className="flex gap-2">
              <Field 
                type="text"
                label="First Name"
                htmlFor="first-name" 
                required
                placeholder="John" 
                errorMessage=""
                half={true}
              />
              <Field 
                type="text"
                label="Last Name"
                htmlFor="last-name" 
                required
                placeholder="Doe" 
                errorMessage=""
                half= {true}
              />
            </div>
            <Field 
              type="password"
              label="Password" 
              htmlFor="password"
              errorMessage=""
              required
            />
            <Field 
              type="password"
              label="Confirm Password" 
              htmlFor="confirm-password"
              errorMessage=""
              required
            />
            <div className='w-ful flex justify-center mt-4 mb-2'><button className="button-red red-glow button-text" type="submit" name="login">Login</button></div>
            <div className="small-text text-center">Already have an account? <a href="/login">Login</a></div>
          </div>
        </div>
      </>
    )
  }
  
export default Register
  