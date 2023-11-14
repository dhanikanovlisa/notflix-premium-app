import { useEffect } from "react";

function Logout() {
    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        localStorage.removeItem("id");
        window.location.href = "/login";
    }, []);

    return (
        <div>
        </div>
    )
}

export default Logout;
