import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Submission from "./pages/submission/Submission";
import EditProfile from "./pages/profile/EditProfile";
import Register from "./pages/register/Register";
import ManageFilm from "./pages/film/ManageFilm";
import EditFilm from "./pages/film/EditFilm";
import DetailFilm from "./pages/film/DetailFilm";
import PageNotFound from "./pages/notFound/PageNotFound";
import CreateSubmission from "./pages/submission/CreateSubmission";

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
        <Route path="/create" element={<CreateSubmission />}/>

        {/**Manage Film */}
        <Route path="/manage-film" element={<ManageFilm />}></Route>
        <Route path="/edit-film/:id" element={<EditFilm />}></Route>
        <Route path="/manage-film/:id" element={<DetailFilm />}></Route>

         {/* Profile*/}
        <Route path="/profile/:id" element= {<Profile />}/>
        <Route path="/edit-profile/:id" element= {<EditProfile />}/>

        {/**Not Found */}
        <Route path="/not-found" element = {<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App