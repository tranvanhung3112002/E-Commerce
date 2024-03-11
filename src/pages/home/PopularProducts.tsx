import { Box, Typography } from '@mui/material'


const PopularProducts = () => {
    return (
        <>
            <Box display="flex" justifyContent="center">
                <Typography component={"span"} align="center" color="primary">
                    Hots and bestsellers on this week
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" sx={{ margin: "20px 0" }}>
                <Typography variant="h4" align="center" fontWeight="bold">
                    Popular products
                </Typography>
            </Box>
        </>
    )
}

export default PopularProducts