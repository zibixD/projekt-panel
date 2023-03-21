import { Button } from "@mui/material";

const debugButton = () =>{

    const response = fetch("https://dev.pgitdev.pl/auth/v2/user/login", {
        headers: { "Authorization": "Bearer awadad" }
    
        
    }
    ) 

    return <Button variant="text">Text</Button>
}

export default debugButton;