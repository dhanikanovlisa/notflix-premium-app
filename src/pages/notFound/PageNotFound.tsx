import { useEffect, useState } from "react";

function PageNotFound() {
  const [isAuth, setIsAuth] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    document.title = "404 Page Not Found";
    if (localStorage.getItem("token")) {
      setIsAuth(true);
      setId(Number(localStorage.getItem("id")));
      setAdmin(localStorage.getItem("admin") === "true");
    } else {
      setIsAuth(false);
    }
  }, [isAuth, admin]);

  return (
    isAuth ? (
      admin ? (
        <div className="pt-28 pl-10 pr-28 justify-center items-center text-center space-y-4">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <button
            className="button-red button-text red-glow"
            aria-label="Home"
            onClick={() => { window.location.href = "/film-request"; }}
          >
            Home
          </button>
        </div>
      ) : (
        <div className="pt-28 pl-10 pr-28 justify-center items-center text-center space-y-4">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <button
            className="button-red button-text red-glow"
            aria-label="Home"
            onClick={() => { window.location.href = `/manage-film/${id}`; }}
          >
            Home
          </button>
        </div>
      )
    ) : (
      <>
        <div className="pt-28 pl-10 pr-28 justify-center items-center text-center space-y-4">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <button
            className="button-red button-text red-glow"
            aria-label="Home"
            onClick={() => { window.location.href = `/`; }}
          >
            Go Back
          </button>
        </div>
      </>
    )
  );
}

export default PageNotFound;
