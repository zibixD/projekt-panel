import { useNavigate } from "react-router-dom";
import { logout } from "../store/authReducer";
import { dispatch } from "../store/storeMain";

export const useLogout = () => {
  const navigate = useNavigate();

  return () => {
    dispatch(logout());
    navigate("/");
  };
};
