import { CircularProgress, Box } from "@mui/material";

export default function LoadingEffect() {
    return (
        <Box sx={{ display: 'flex'}}>
            <CircularProgress/>
        </Box>
    )
}