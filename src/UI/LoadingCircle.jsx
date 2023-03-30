import { CircularProgress, Box, Typography } from "@mui/material";
// import Typography from "@mui/material";

export default function LoadingEffect() {
    return (
        <Box sx={{
            width: "100vw",
            height: "100vh",
            display: 'flex',
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
            }}>
            <Typography>Ładowanie...</Typography>
            <CircularProgress/>
        </Box>
    )
}