import { json, redirect } from 'react-router-dom';

import LoginForm from "../components/LoginForm";

const LoginPage = () => {

    return <LoginForm/>
}

export default LoginPage;

export async function action({ request }){
    
    // const [enabled, setEnabled] = useState(true);
    

    const formData = await request.formData();
    const username = formData.get("email");
    const password = formData.get("password");

    if(username !== "admin@polskagrupa.it" || password !== "admin"){
        alert('Niepoprawny email lub hasło')
        return null
    }

    const response = await fetch('https://dev.pgitdev.pl/auth/v2/user/login', {
        method: 'post',
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({username, password})
        // {...recivedData}
    })
    // await new Promise (resolve => setTimeout (resolve, 3000));

    if(response.status === 422 || response.status === 401) {
        return response
    }

    if(!response.ok){
        throw json({message: 'Brak autoryzacji użytkownika'}, { status: 500});
    }

    const resData = await response.json();
    const token = resData.access_token;

    localStorage.setItem('token', token);
    
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem('expiration', expiration.toISOString())

    return redirect('firmy');

};

