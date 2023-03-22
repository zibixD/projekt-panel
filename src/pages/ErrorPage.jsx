import ErrorContent from "../components/ErrorContent";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    let title = "Wystapił błąd";
    let message ="Spróbuj ponownie";

    if(error.status === 404){
        title = "Kod błędu 404"
        message = "Nie znaleziono szukanej strony"
    }

    return <ErrorContent title={title}>{message}</ErrorContent>
}

export default ErrorPage