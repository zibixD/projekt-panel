import { Form, useActionData, useNavigation } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showErrorSnack } from "../store/ui-actions";
import { useIsMobile } from "../hooks/useIsMobile";

const LoginForm = () => {
  const [filledE, setFilledE] = useState();
  const [filledP, setFilledP] = useState();
  const dispatch = useDispatch();
  const formErrors = useActionData();
  const navigation = useNavigation();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (formErrors?.error) {
      dispatch(showErrorSnack(formErrors?.error));
    }
  }, [formErrors]);


  const isSubmitting = navigation.state === "submitting";

  return (
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
          width: { xs: "100%", sm: 600 },
        }}
      >
        <Box
          sx={{ 
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          paddingY: 8,
          boxShadow: 5,
          width: { xs: "100%", sm: 600 },
          }}
        >
       <Form action="/" method="post" style={{ width: isMobile ? "80%" : "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              // width: isMobile ? "80%" : "100%"
            }}
          >
            <TextField
              sx={{
                marginY: 5,
                width: { xs: "100%", sm: 500 },
              }}
              name="email"
              id="email"
              label="Email"
              type="email"
              required
              onChange={(event) => setFilledE(event.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TextField
              sx={{
                mb: 5,
                width: { xs: "100%", sm: 500 },
              }}
              name="password"
              id="password"
              label="Hasło"
              type="password"
              required
              onChange={(event) => setFilledP(event.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{
                height: 50,
              }}
              type="submit"
              disabled={!filledE || !filledP || isSubmitting}
            >
              {isSubmitting ? "zatwierdzanie" : "zaloguj"}
            </Button>
          </Box>
        </Form></Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
