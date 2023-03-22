import { useSelector } from "react-redux";
import { calculateTokenTime } from "../util/calculateTokenTime";

export const useIsAuthenticated = () => {
  const token = useSelector((state) => state.auth.token);
  const expirationTime = useSelector((state) => state.auth.expiration);

  const calculatedTime = calculateTokenTime(expirationTime);

  if (!token || token.length < 1) {
    return false;
  }

  if (calculatedTime < 0) {
    return false;
  }

  return true;
};
