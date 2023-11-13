import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Submission from "./pages/user/submission/Submission";
import EditProfile from "./pages/profile/EditProfile";
import Register from "./pages/register/Register";
import ManageFilm from "./pages/user/film/ManageFilm";
import EditFilm from "./pages/user/film/EditFilm";
import DetailFilm from "./pages/user/film/DetailFilm";
import PageNotFound from "./pages/notFound/PageNotFound";
import CreateSubmission from "./pages/user/submission/CreateSubmission";
import Logout from "./pages/login/Logout";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoutes";
import AdmissionFilm from "./pages/admin/film/AdmissionFilm";
import Subscription from "./pages/admin/subscription/Subscription";
import DetailSubmission from "./pages/user/submission/DetailSubmission";
import EditSubmission from "./pages/user/submission/EditSubmission";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element= {<ProtectedRoute type="home"><Login /></ProtectedRoute>}/>
        {/* Auth */}
        <Route path="/login" element= {<Login />}/>
        <Route path="/registration" element= {<Register />}/>
        <Route path="/logout" element= {<Logout />}/>

        {/**User */}
        {/**Submission */}
        <Route path="/submission/:id" element={<ProtectedRoute type="user"><Submission /></ProtectedRoute>}/>
        <Route path="/submission/create" element={<ProtectedRoute type="user"><CreateSubmission /></ProtectedRoute>}/>
        <Route path="/submission/film/:id" element={<ProtectedRoute type="user"><DetailSubmission /></ProtectedRoute>}/>
        <Route path="/submission/edit/:id" element={<ProtectedRoute type="user"><EditSubmission /></ProtectedRoute>}/>


        {/**Manage Film */}
        <Route path="/manage-film/:id" element={<ProtectedRoute type="user"><ManageFilm /></ProtectedRoute>}></Route>
        <Route path="/manage-film/edit/:id" element={<ProtectedRoute type="user"><EditFilm /></ProtectedRoute>}></Route>
        <Route path="/manage-film/film/:id" element={<ProtectedRoute type="user"><DetailFilm /></ProtectedRoute>}></Route>

        {/**Admin */}
        {/**Request Film */}
        <Route path="/film-request" element={<ProtectedRoute type="admin"><AdmissionFilm /></ProtectedRoute>}/>
        {/**Subscription */}
        <Route path="/subscription" element={<ProtectedRoute type="admin"><Subscription /></ProtectedRoute>}/>

         {/* Profile*/}
        <Route path="/profile/:id" element= {<ProtectedRoute type="user admin"><Profile /></ProtectedRoute>}/>
        <Route path="/profile/edit/:id" element= {<ProtectedRoute type="user admin"><EditProfile /></ProtectedRoute>}/>

        {/**Not Found */}
        <Route path="*" element = {<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App