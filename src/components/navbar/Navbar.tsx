import { useEffect, useState } from "react";
import { User } from "../../types/interfaces";
import { useAuth } from "../../hooks/useAuth";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { getAPI } from "../../utils/api";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [id, setId] = useState<number>(0);
  const [profile, setProfile] = useState<User | null>();
  const { logout } = useAuth();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    if (getItem("token")) {
      setIsAuth(true);
      setAdmin(getItem("admin") === "true");
      setId(Number(getItem("id")));
    } else {
      setIsAuth(false);
    }
  }, []);

  async function getProfile() {
    try {
      const response = await getAPI(`profile/${Number(id)}`);
      const data = await response.json();
      const mappedProfile = data.data;
      setProfile(mappedProfile);
    } catch (error) {
      console.error("Error fetching profile", error);
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

        {isAuth ? (
          <>
            <div className="hidden lg:flex flex-row space-x-9 items-center">
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
                  style={{ height: "40px", width: "40px" }}
                />
              </button>
              {open && (
                <div className="absolute top-24 right-12  w-36 h-32 bg-white rounded-lg shadow-lg">
                  <ul className="flex flex-col p-4 space-y-4">
                    <li className="p-1 text-black font-bold hover:bg-red-600  hover:text-white hover:font-bold hover:pl-1 hover:pr-1 hover:pt-2 hover:pb-2 hover:rounded-md">
                      <a href={`/profile/${id}`}>
                        Profile
                      </a>
                    </li>
                    <li className="p-1 text-black hover:bg-red-600 font-bold hover:text-white hover:font-bold hover:pl-1 hover:pr-1 hover:pt-2 hover:pb-2 hover:rounded-md" onClick={logout}>
                        Log Out
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="lg:hidden">
              <button onClick={() => setOpen(!open)}>
                <img src="/src/assets/Burger bar.svg" alt="Burger Bar" />
              </button>
              {open && (
                <div className="absolute top-24 right-12 w-48 h-56 bg-white rounded-lg shadow-lg">
                  <ul className="flex flex-col space-y-3 p-4">
                    {admin ? (
                      <>
                        <li className="p-1 text-black font-bold hover:bg-red-600  hover:text-white hover:font-bold hover:pl-1 hover:pr-1 hover:pt-2 hover:pb-2 hover:rounded-md">
                          <a href="/film-request">
                              Film Submission
                          </a>
                        </li>
                        <li className="p-1 text-black font-bold hover:bg-red-600  hover:text-white hover:font-bold hover:pl-1 hover:pr-1 hover:pt-2 hover:pb-2 hover:rounded-md">
                            <p className="text-black font-bold">Subscription</p>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="p-1 text-black font-bold hover:bg-red-600  hover:text-white hover:font-bold hover:pl-1 hover:pr-1 hover:pt-2 hover:pb-2 hover:rounded-md">
                          <a href={`/manage-film/${id}`}>
                            Manage Film
                          </a>
                        </li>
                        <li>
                          <a href={`/submission/${id}`}>
                            Submission
                          </a>
                        </li>
                      </>
                    )}
                    <li className="p-1 text-black font-bold hover:bg-red-600  hover:text-white hover:font-bold hover:pl-1 hover:pr-1 hover:pt-2 hover:pb-2 hover:rounded-md">
                      <a href={`/profile/${id}`}>
                        Profile
                      </a>
                    </li>
                    <li className="p-1 text-black font-bold hover:bg-red-600  hover:text-white hover:font-bold hover:pl-1 hover:pr-1 hover:pt-2 hover:pb-2 hover:rounded-md"  onClick={logout}>
                          Log Out
                    </li>
                  </ul>
                </div>
              )}
            </div>
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
    </nav>
  );
}

export default Navbar;
