import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  type?: string;
  children: JSX.Element;
};

const url = import.meta.env.VITE_REST_URL;

const ProtectedRoute = ({ type, children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [id, setId] = useState<number>(0);
  const fetchData = async () => {
    try {
      const res = await fetch(`${url}/check/current-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token") || "",
        },
      });

      const data = await res.json();
      if (data.user) {
        setId(Number(localStorage.getItem("id")));
        console.log(data);

        if (!data.isAuth) {
          navigate("/login");
        }

        if (type && type.includes("admin") && !data.user.is_admin) {
          navigate("/not-found");
        }

        if (type && type.includes("user") && data.user.is_admin) {
          navigate("/not-found");
        }

        if (type && type.includes("home") && !data.user.is_admin) {
          navigate("/submission/" + id);
        }

        if (type && type.includes("admin") && type.includes("home")) {
          navigate("/substription");
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return children;
};

export default ProtectedRoute;
