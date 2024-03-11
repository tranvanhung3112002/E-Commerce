import { Box, Typography } from "@mui/material";

import { RootState } from "../../../features/Redux/Store/store";
import { useSelector } from "react-redux";
import ListProductComponent from "../../home/ListProduct";
interface IRelatedProductProps {
  category: string;
}
const RelatedProduct = ({ category }: IRelatedProductProps) => {
  const listProduct = useSelector(
    (state: RootState) => state.reducer.productSlice.listProduct
  );

  console.log(listProduct);

  const listProductRelated = listProduct.filter(
    (item) => item.categoryName === category
  );
  return (
    <>
      <Box display="flex" justifyContent="center">
        <Typography component={"span"} align="center" color="primary">
          Shop Woodmart
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" sx={{ margin: "20px 0" }}>
        <Typography variant="h4" align="center" fontWeight="bold">
          Related Products
        </Typography>
      </Box>
      <Box sx={{ overflow: "hidden", paddingBottom: "30px" }}>
        <ListProductComponent listProduct={listProductRelated} />
      </Box>
    </>
  );
};

export default RelatedProduct;
