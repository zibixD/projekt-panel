import EditCompanyDetails from "../components/EditCompanyDetails";
import { useIsAuthenticated } from "../hooks/useIsAuthenticated";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EditDetailsPage = () => {
  const isAuth = useIsAuthenticated();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth]);
  
  return <EditCompanyDetails />;
};

export default EditDetailsPage;
