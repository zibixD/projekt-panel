import { useRouteError } from "react-router-dom"

const ErrorPage = () => {
    
    const error = useRouteError()

    let title = "Wystąpił błąd"
    let message = "Coś poszło nie tak"

    if(error.status === 401 || error.status === 500){
        message = error.data.message;
    }

    if(error.status === 404){
        title = "Nie znaleziono strony"
        message = "Wróć do strony logowania"
    }
    
    return(
        <div>
            <h1 title={title}>{title}</h1>
            <p>{message}</p>
        </div>
    )
}

export default ErrorPage