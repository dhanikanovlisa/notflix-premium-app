import { useState } from "react";

function Navbar() {
  const [open, isOpened] = useState(false);

  return (
    <nav className="fixed w-full z-20 justify-between items-center">
      <div className="flex flex-wrap items-center justify-between mx-auto pt-5 pl-10 pr-10">
        <a href="/">
          <img src="/src/assets/notflix-premium-logo.svg" alt="Logo"></img>
        </a>
        <div className="flex flex-row space-x-9 items-center">
        <a href="/manage-film">
            <p className="">Manage Film</p>
          </a>
          <a href="/submission">
            <p className="">Submission</p>
          </a>
          <button onClick={() => isOpened(!open)}>
            <img
              src="/src/assets/profile-placeholder.png"
              className="rounded-full shadow-md red-glow"
              alt="Profile"
            ></img>
          </button>
          {open && (
            <div className="absolute top-24 right-12 w-36 h-24 bg-white rounded-lg shadow-lg">
              <ul className="flex flex-col space-y-3 p-4">
                <li>
                  <a href="/profile">
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
