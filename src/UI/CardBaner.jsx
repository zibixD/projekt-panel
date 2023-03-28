import { Box } from "@mui/system";
import { Card, Typography, Button, TextField } from "@mui/material";
import { Children } from "react";

const CardBaner = (props) => {
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
        {props.children}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "90%",
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
      </Card>
    )
}

export default CardBaner