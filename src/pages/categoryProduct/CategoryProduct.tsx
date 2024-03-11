import { Box } from "@mui/material";
import { Fragment } from "react";
import ListProductShop from "../../components/listproductshop";
import { useLocation } from "react-router-dom";
import { RootState } from "../../features/Redux/Store/store";
import { useSelector } from "react-redux";
import ListCategory from "../../components/listCategory/ListCategory";

const CategoryProduct = () => {
  const categories = useSelector(
    (state: RootState) => state.reducer.categorySlice.categories
  );
  const location = useLocation();
  const listCategoryProduct = location.state;
  const listProduct = useSelector(
    (state: RootState) => state.reducer.productSlice.listProduct
  );

  return (
    <Fragment>
      <Box>
        <Box sx={{ paddingTop: "60px" }}>
          <ListCategory
            categories={categories}
            listProduct={listProduct}
          ></ListCategory>
        </Box>
        <Box className="px-2 py-4 my-4">
          <ListProductShop listProduct={listCategoryProduct}></ListProductShop>
        </Box>
      </Box>
    </Fragment>
  );
};

export default CategoryProduct;
