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
  
  useEffect(() => {
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
          console.log("dari protexted route", data);

          if (!data.isAuth) {
            navigate("/login");
          }
          

          if(type && type.includes("user admin")){
            console.log("dari protected route user admin");
            navigate('/profile/' + id);
          } 
          
          if(type && type.includes("edit user admin")){
            console.log("dari protected route user admin edit");
            navigate('/profile/edit/' + id);
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

    fetchData();
  }, [id, navigate, type]);

  return children;
};

export default ProtectedRoute;
