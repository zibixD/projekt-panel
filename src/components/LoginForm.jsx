import { Form, useActionData, useNavigation } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showErrorSnack } from "../store/ui-actions";

const LoginForm = () => {
  const [filledE, setFilledE] = useState();
  const [filledP, setFilledP] = useState();
  const dispatch = useDispatch();
  const formErrors = useActionData();

  useEffect(() => {
    if (formErrors?.error) {
      dispatch(showErrorSnack(formErrors?.error));
    }
  }, [formErrors]);

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%", backgroundColor: "primary.light" }}>
          <Typography
            variant="h4"
            sx={{
              p: 4,
              color: "white",
            }}
          >
            Panel logowania
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 4,
            width: { sx: "100%", sm: 600, md: 700 },
            height: { sx: "100%", sm: 400 },
            // padding: { sx}
            // marginX: { sx: "0%", sm: "10%", md: "15%", lg: "30%" },
            // marginRight: {sx: 100, sm: '10%', md: '20%', lg: '30%'},
          }}
        >
          <Form action="/" method="post">
            <Box>
              <TextField
                sx={{
                  mb: 5,
                  mt: 10,
                  mx: 5,
                  width: { sx: "100%", sm: 500 },
                }}
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
                sx={{
                  mb: 5,
                  mx: 5,
                  width: { sx: "100%", sm: 500 },
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
                width: { sx: "100%", sm: 500 },
                mx: 5,
              }}
              type="submit"
              disabled={!filledE || !filledP || isSubmitting}
            >
              {isSubmitting ? "zatwierdzanie" : "zaloguj"}
            </Button>
          </Form>
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
