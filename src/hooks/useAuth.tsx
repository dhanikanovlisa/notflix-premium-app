import { postAPI } from "../utils/api";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const { setItem, getItem, removeItem } = useLocalStorage();

  const login = async (username: string, password: string) => {
    try {
      const data = { username, password };
      const response = await postAPI("auth/login", data);
      const res = await response.json();

      if(!res.ok){
        return false;
      }

      setItem("token", res.token);
      setItem("admin", res.is_admin);
      setItem("id", res.id);

      setTimeout(() => {
        if (res.is_admin) {
          window.location.href = "/film-request";
        } else {
          window.location.href = `/submission/${res.id}`;
        }
      }, 1600);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const isAdmin = () => {
    return getItem("admin") === "true";
  };

  const isAuth = () => {
    return getItem("token") !== null;
  };

  const logout = () => {
    removeItem("token");
    removeItem("id");
    removeItem("admin");
    window.location.href = "/";
  };

  return { logout, login, isAuth, isAdmin };
};
