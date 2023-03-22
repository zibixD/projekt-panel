import { Box } from "@mui/system"
import  Typography  from '@mui/material/Typography'
import { Link, useNavigate } from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const ErrorContent = ({ title, children }) => {
    const navigate = useNavigate()    
    
  const backHandler = () => {
    navigate("/firmy");
  };
    
    return (
        <Box textAlign="center" sx={{
            p: 5,
        }}>
            <Typography variant="h4" >{title}</Typography>
            <Typography>{children}</Typography>
            <ExitToAppIcon onClick={backHandler} sx={{
                fontSize: 40
            }} >Wróć</ExitToAppIcon>
        </Box>
    )
}

export default ErrorContent;