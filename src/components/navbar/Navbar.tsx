import { useEffect, useState } from "react";
import { User } from "../../types/interfaces";

function Navbar() {
  const url = import.meta.env.VITE_REST_URL;
  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [id, setId] = useState<number>(0); 
  const [profile, setProfile] = useState<User | null>();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
      setAdmin(localStorage.getItem("admin") === "true");
      setId(Number(localStorage.getItem("id")));
    } else {
      setIsAuth(false);
    }
  }, []);

  async function getProfile() {
    try {
      const response = await fetch(`${url}/profile/${Number(id)}`);
      // if (!response.ok) {
      //   if (response.status === 404) {
      //     console.log("masuk 404");
      //     window.location.href = "/not-found";
      //     return;
      //   }
      // }
      const data = await response.json();
      const mappedProfile = data.data;
      setProfile(mappedProfile);
    } catch (error) {
      console.error("Erro fetching profile", error);
    } 
  }

  useEffect(() => {
    if (id !== 0) {
      getProfile();
    }
  }, []);

  return (
    <nav className="fixed w-full z-20 justify-between items-center">
      <div className="flex flex-wrap items-center justify-between mx-auto pt-5 pl-10 pr-10">
        <a href="/">
          <img src="/src/assets/notflix-premium-logo.svg" alt="Logo" />
        </a>
        <div className="flex flex-row space-x-9 items-center">
          {isAuth ? (
            <>
              {admin ? (
                <>
                  <a href="/film-request">
                    <p className="">Film Submission</p>
                  </a>
                  <a href="/subscription">
                    <p className="">Subscription</p>
                  </a>
                </>
              ) : (
                <>
                  <a href={`/manage-film/${id}`}>
                    <p className="">Manage Film</p>
                  </a>
                  <a href={`/submission/${id}`}>
                    <p className="">Submission</p>
                  </a>
                </>
              )}
              <button onClick={() => setOpen(!open)}>
                <img
                  src={`/src/assets/storage/profile/${profile?.photo_profile}`}
                  className="rounded-full shadow-md red-glow"
                  alt="Profile"
                  style={{ height: '60px', width: '100%' }}
                />
              </button>
              {open && (
                <div className="absolute top-24 right-12 w-36 h-24 bg-white rounded-lg shadow-lg">
                  <ul className="flex flex-col space-y-3 p-4">
                    <li>
                      <a href={`/profile/${id}`}>
                        <p className="text-black font-bold">Profile</p>
                      </a>
                    </li>
                    <li>
                      <a href="/logout">
                        <p className="text-black font-bold">Log Out</p>
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              <a href="/login">
                <button
                  className="button-red button-text red-glow"
                  aria-label="Home"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  Log In
                </button>
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
