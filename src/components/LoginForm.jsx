import { Form } from "react-router-dom";
import { Box, TextField, Button, FormControl } from "@mui/material";

import classes from "./LoginForm.module.css";
import { useState } from "react";

const LoginForm = () => {
  const [filledE, setFilledE] = useState();
  const [filledP, setFilledP] = useState();

  return (
    <Form action="/" method="post" className={classes.form}>
      <Box>
        <TextField
          name="email"
          id="email"
          label="Email"
          type="email"
          required
          onChange={(event) => setFilledE(event.target.value)}
        />
      </Box>
      <Box>
        <TextField
          name="password"
          id="password"
          label="Hasło"
          type="password"
          required
          onChange={(event) => setFilledP(event.target.value)}
        />
      </Box>
      <Button type="submit" disabled={!filledE || !filledP}>
        Zaloguj
      </Button>
    </Form>
  );
};

export default LoginForm;
