import { IProduct } from "../../../types/Models";
import { Box, Grid, Rating, Typography } from "@mui/material";
import ProductItemComponent from "../../product";

interface LisProductPageProps {
  listProductPage: IProduct[];
  productLine: number;
}
const ListProductPage = ({
  listProductPage,
  productLine,
}: LisProductPageProps) => {
  return (
    <Box>
      <Grid container spacing={1}>
        {listProductPage.map((item: IProduct) => (
          <Grid
            item
            lg={12 / productLine}
            sm={productLine === 1 ? 12 : 4}
            md={productLine === 1 ? 12 : 3}
            xs={productLine === 1 ? 12 : 12}
            key={item.id}
            sx={{ display: productLine === 1 ? "flex" : "block" }}
          >
            <Grid
              lg={productLine === 1 ? 4 : 0}
              xs={productLine === 1 ? 12 : 0}
              sm={productLine === 1 ? 12 : 0}
              md={productLine === 1 ? 12 : 0}
              item
            >
              <ProductItemComponent productItem={item} />
            </Grid>
            {productLine === 1 && (
              <Grid lg={8} item className="d-none d-md-block">
                <Box className="p-4">
                  <Typography variant="h4" fontWeight="500">
                    {item.name}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="start"
                    className="mb-3"
                    alignItems="center"
                  >
                    <Rating
                      name="simple-controlled"
                      value={item.rating.rate}
                      size="small"
                    />
                    <Typography className="ms-2">
                      ({item.rating.count} customer review)
                    </Typography>
                  </Box>
                  <Box className="mb-3">
                    <Typography variant="h5" fontWeight="500" color="primary">
                      $
                      {(
                        item.price -
                        item.price * (item.discount / 100)
                      ).toFixed(2)}
                    </Typography>
                  </Box>
                  <Typography component="p" className="my-3">
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListProductPage;
