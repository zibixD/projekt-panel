import AddUserForm from "../components/AddUserForm"
import { useIsAuthenticated } from "../hooks/useIsAuthenticated";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddUserPage = () => {
    const isAuth = useIsAuthenticated();
    const navigate = useNavigate();  

    useEffect(() => {
        if (!isAuth) {
          navigate("/");
        }
      }, [isAuth]);
    
    return <AddUserForm/>
}

export default AddUserPage;