import { Box } from "@mui/system";
import { Card, Typography, Button, TextField } from "@mui/material";
import { useLogout } from "../hooks/useLogout";

const CardBaner = (props) => {
  const logout = useLogout()  
  
  return(
        <Card
        sx={{
          backgroundColor: "primary.light",
          width: "100%",
          color: "white",
          textAlign: "center",
          boxShadow: 5,
          marginBottom: 0.3,
          display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: {xs: "column", sm: "row" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "20%"},
          }}        
        >
        {props.children}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: { xs: "100%" ,sm: "60%"},
          }}
        >
          <Typography
            variant="h3"
            sx={{
              height: 50,
              padding: {xs: 1, sm: 4},
              fontSize: {xs: 40, sm: 50},
            }}
          >
            {props.title}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              paddingBottom: 0.5,
            }}
          >
            {props.info}
          </Typography>
        </Box>
          <Button
            onClick={logout}
            sx={{
              color: "white",
              width: {xs: "100%" ,sm:"20%"},
              paddingRight: {xs: 0, sm: 6},
              fontSize: 20,
            }}
          >
           Wyloguj
          </Button>
        
      </Card>
    )
}

export default CardBaner