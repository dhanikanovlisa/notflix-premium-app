import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Profile from "./pages/user/Profile";
import Submission from "./pages/submission/Submission";
import EditProfile from "./pages/user/EditProfile";
import Register from "./pages/register/Register";
import ManageFilm from "./pages/film/ManageFilm";
import EditFilm from "./pages/film/EditFilm";
import DetailFilm from "./pages/film/DetailFilm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element= {<Login />}/>
        {/* Auth */}
        <Route path="/login" element= {<Login />}/>
        <Route path="/registration" element= {<Register />}/>

        {/**Submission */}
        <Route path="/submission" element={<Submission />}/>

        {/**Manage Film */}
        <Route path="/manage-film" element={<ManageFilm />}></Route>
        <Route path="/edit-film" element={<EditFilm />}></Route>
        <Route path="/detail-film" element={<DetailFilm />}></Route>

         {/* Profile*/}
        <Route path="/profile" element= {<Profile />}/>
        <Route path="/edit-profile" element= {<EditProfile />}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App