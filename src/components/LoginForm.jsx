import { Form, useNavigation } from "react-router-dom"
import { Input, Button } from "@mui/material"; 

import classes from './LoginForm.module.css'

const LoginForm = () => {
    const navigation = useNavigation()

    const isSubmitting = navigation.state === 'submitting'

    return (
        <Form method="post" className={classes.form}>
            <label htmlFor="email">Email</label>
            <Input id="email" type="email" required></Input>
            <label htmlFor="password">Hasło</label>
            <Input id="password" type="password" required></Input>
            <button disabled={isSubmitting} >{isSubmitting ? 'Submitting...' : 'Zaloguj'}</button>
        </Form>
    )
}

export default LoginForm;


