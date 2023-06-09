import { Form, useNavigation } from "react-router-dom";
import { Box, TextField, Button, FormControl, Typography } from "@mui/material";

import { useState } from "react";


const LoginForm = () => {
  const [filledE, setFilledE] = useState();
  const [filledP, setFilledP] = useState();

  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting'

  return (
    <>
      <Typography variant="h4" sx={{
        backgroundColor: 'primary.light',
        color: 'white',

        height: {sx: 10, sm:70 },
        width: {sx: "50%", sm: "100%"},
        padding: 4
        
      }}>Panel logowania</Typography>
    
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: "center",
      boxShadow: 4,
      width: {sx: "100%", sm:700},
      height: {sx: "100%", sm:400},
      marginLeft: {sx: 100, sm: '30%'},
    }}>
      <Form action="/" method="post">
      <Box >
        <TextField
          sx={{ 
          mb: 5, mt: 10,
          width: {sx:"100%", sm: 500}
            
        }}
          name="email"
          id="email"
          label="Email"
          type="email"
          required
          onChange={(event) => setFilledE(event.target.value)         
          }
        />
      </Box>
      <Box>
        <TextField
          sx={{ 
          mb: 5,
          width: {sx:"100%", sm: 500}       
        }}
          name="password"
          id="password"
          label="Hasło"
          type="password"
          required
          onChange={(event) => setFilledP(event.target.value)}
        />
      </Box>
      <Button
        sx={{
          height: 50,
          width: {sx:"100%", sm: 500},
          display: 'flex',
          


        }}
        type="submit"
        disabled={!filledE || !filledP || isSubmitting} >
        {isSubmitting ? 'zatwierdzanie' : 'zaloguj' }
      </Button>
    </Form>
    </Box>
    </>
  );
};

export default LoginForm;
