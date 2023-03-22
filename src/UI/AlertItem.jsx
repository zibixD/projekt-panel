import { Alert, Button, Snackbar } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";

const AlertItem = () => {
    const [open, setOpen] = useState(false);
    

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    

    return(
        <Stack sx={{ width: "100%"}}>
            <Button type="submit" onClick={handleClick}>
                Zaloguj
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="success" sx={{
                    width: "100%"
                }}></Alert> 
            </Snackbar>
        </Stack>
    )
}

export default AlertItem;