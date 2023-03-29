import { CircularProgress, Box } from "@mui/material";

export default function LoadingEffect() {
    return (
        <Box sx={{
            width: "100vw",
            height: "100vh",
            display: 'flex',
            justifyContent: "center",
            }}>
            <CircularProgress/>
        </Box>
    )
}