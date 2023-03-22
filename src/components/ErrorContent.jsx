import { Box } from "@mui/system"
import  Typography  from '@mui/material/Typography'


const ErrorContent = ({ title, children }) => {
    return (
        <Box>
            <Typography>{title}</Typography>
            {children}
        </Box>
    )
}

export default ErrorContent;