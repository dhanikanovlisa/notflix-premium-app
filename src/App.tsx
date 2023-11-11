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
import Logout from "./pages/login/Logout";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element= {<ProtectedRoute type="home"><Login /></ProtectedRoute>}/>
        {/* Auth */}
        <Route path="/login" element= {<Login />}/>
        <Route path="/registration" element= {<Register />}/>
        <Route path="/logout" element= {<Logout />}/>

        {/**Submission */}
        <Route path="/submission" element={<ProtectedRoute type="user"><Submission /></ProtectedRoute>}/>
        <Route path="/create" element={<ProtectedRoute type="user"><CreateSubmission /></ProtectedRoute>}/>

        {/**Manage Film */}
        <Route path="/manage-film" element={<ProtectedRoute type="user"><ManageFilm /></ProtectedRoute>}></Route>
        <Route path="/edit-film/:id" element={<ProtectedRoute type="user"><EditFilm /></ProtectedRoute>}></Route>
        <Route path="/manage-film/:id" element={<ProtectedRoute type="user"><DetailFilm /></ProtectedRoute>}></Route>

         {/* Profile*/}
        <Route path="/profile/:id" element= {<ProtectedRoute type="user admin"><Profile /></ProtectedRoute>}/>
        <Route path="/edit-profile/:id" element= {<ProtectedRoute type="user"><EditProfile /></ProtectedRoute>}/>

        {/**Not Found */}
        <Route path="/not-found" element = {<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App