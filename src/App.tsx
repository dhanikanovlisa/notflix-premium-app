import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Profile from "./pages/user/Profile";
import Submission from "./pages/submission/Submission";
import EditProfile from "./pages/user/EditProfile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element= {<Login />}/>
        {/* Auth */}
        <Route path="/login" element= {<Login />}/>

        {/**Submission */}
        <Route path="/submission" element={<Submission />}/>

         {/* Profile*/}
        <Route path="/profile" element= {<Profile />}/>
        <Route path="/edit-profile" element= {<EditProfile />}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App