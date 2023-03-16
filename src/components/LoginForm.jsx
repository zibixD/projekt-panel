import { Form  } from "react-router-dom"
import { Input } from "@mui/material"; 

import classes from './LoginForm.module.css'
import { useState } from "react";


const LoginForm = () => {

    const [filledE, setFilledE] = useState()
    const [filledP, setFilledP] = useState()

    
    return (
        <Form  action="/" method="post" className={classes.form}>
            <label htmlFor="email">Email</label>
            <Input name="email" id="email" type="email" required onChange={event => setFilledE(event.target.value)}/>
            <label htmlFor="password">Hasło</label>
            <Input name="password" id="password" type="password" required onChange={event => setFilledP(event.target.value)}/>
            <button type="submit" disabled={!filledE || !filledP}>Zaloguj</button>
        </Form>
    )
}

export default LoginForm;


