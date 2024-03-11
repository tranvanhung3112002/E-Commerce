import { Box, Typography } from '@mui/material'

const FeatureCollection = () => {
  return (
    <>
       <Box display="flex" justifyContent="center">
            <Typography component={"span"} align="center" color="primary">
              Discover lots new products
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" sx={{ margin: "20px 0" }}>
            <Typography variant="h4" align="center" fontWeight="bold">
              Feature collection
            </Typography>
        </Box> 
    </>
  )
}

export default FeatureCollection