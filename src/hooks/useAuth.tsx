import { postAPI } from "../utils/api";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const { setItem, getItem, removeItem } = useLocalStorage();

  const login = async (username: string, password: string) => {
    try {
      const res = await postAPI("auth/login", { username, password });
      const data = await res.json();

      if (res.ok && res.status === 200) {
        setItem("token", data.token);
        setItem("admin", data.is_admin);
        setItem("id", data.id);

        return { success: true, isAdmin: data.is_admin, id: data.id };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error logging in", error);
      return { success: false, message: "Login failed. Please check your credentials." };
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
