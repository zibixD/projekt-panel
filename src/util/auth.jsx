import { redirect } from "react-router-dom";


export function getTokenTime() {
    const storedExpirationTime = localStorage.getItem('expiration');
    const expirationTime = new Date(storedExpirationTime);
    const now = new Date();
    const duration = expirationTime.getTime() - now.getTime();
    return duration
}

export function getAuthToken() {
    const token = localStorage.getItem('token')

    if(!token){
        return null;
    }

    const tokenDuration = getTokenTime();

    if(tokenDuration < 0){
        return 'EXPIRED';
    }
    return token;
}

export function tokenLoader() {
    return getAuthToken();
}

export function checkAuthLoader(){
    const token = getAuthToken();

    if(!token){
        return redirect('/')
    }
    return null;
}