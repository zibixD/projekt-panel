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
        }}
      >
        <Box
          sx={{
            width: "33%"
          }}        
        >
        {props.children}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "34%",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              height: 50,
              padding: 4,
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
              width: "33%",
              paddingRight: 6,
              fontSize: 20,
            }}
          >
           Wyloguj
          </Button>
        
      </Card>
    )
}

export default CardBaner