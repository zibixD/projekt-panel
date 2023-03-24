import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CompanyDetail from "../components/CompanyDetail";
import { useIsAuthenticated } from "../hooks/useIsAuthenticated";

const CompanyDetailPage = () => {
    const isAuth = useIsAuthenticated();
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) {
            navigate("/")
        }
    }, [isAuth])

    return <CompanyDetail/>
}

export default CompanyDetailPage;