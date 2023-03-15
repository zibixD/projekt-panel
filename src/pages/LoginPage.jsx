import { json, redirect } from 'react-router-dom';

import LoginForm from "../components/LoginForm";

const LoginPage = () => {
    return <LoginForm></LoginForm>
}

export default LoginPage;

export async function action({ request }){

    debugger

    const response = await fetch('https://dev.pgitdev.pl/auth/v2/user/login', {
        method: 'post',
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
            username: 'admin@polskagrupa.it',
            password: "admin",
        })
    })
    if(response.status === 422 || response.status === 401) {
        return response
    }

    if(!response.ok){
        throw json({message: 'Brak autoryzacji użytkownika'}, { status: 500});
    }

    const resData = await response.json();
    const token = resData.token;

    localStorage.setItem('token', token);
    
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem('expiration', expiration.toISOString())

    return redirect('firmy');

};