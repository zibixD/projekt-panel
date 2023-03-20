import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CompanyList from "../components/CompanyList";
import { useIsAuthenticated } from "../hooks/useIsAuthenticated";

const HomePage = () => {
  const isAuth = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  return <CompanyList />;
};

export default HomePage;
