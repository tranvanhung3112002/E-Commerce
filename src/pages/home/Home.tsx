import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../features/Redux/Store/store";
import { IProduct } from "../../types/Models";
import FeatureCollection from "./FeatureCollection";
import PopularProducts from "./PopularProducts";

import ListCategory from "../../components/listCategory/ListCategory";
import Collection from "./Collection";
import { Fragment } from "react";
import { settingSlideHeader } from "../../constants/SettingSlideHeader";
import ListProductComponent from "./ListProduct";
import { slideImages } from "../../assets/sildeImage";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import { divStyle } from "./StyleComponent";
// import HeaderTab from "../../components/Header/HeaderTab";
// import styles from "./Home.module.css";
const Home = () => {
  // const cart = useSelector(
  //   (state: RootState) => state.reducer.cartSlice.listProductCart
  // );
  const listProduct = useSelector(
    (state: RootState) => state.reducer.productSlice.listProduct
  );

  const listNewProduct = listProduct.filter((item) =>
    item.state.includes("new")
  );
  console.log(listNewProduct);
  const listPopularProduct = listProduct.filter(
    (item: IProduct) => item.buy > 50
  );
  console.log(listPopularProduct);
  const categories = useSelector(
    (state: RootState) => state.reducer.categorySlice.categories
  );
  const settings = settingSlideHeader;

  return (
    <Fragment>
      <Box>
        <Slider {...settings}>
          {slideImages.map((image, index) => (
            <Box
              key={index}
              sx={{
                ...divStyle,
                color: "white",
                backgroundImage: `url(${image.url})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div className="position-absolute bottom-0 start-0 m-4">
                <div className="content">
                  <h1 style={{ whiteSpace: "pre-wrap" }}>
                    {slideImages[index].title}
                  </h1>
                  <h5 style={{ whiteSpace: "pre-wrap" }}>
                    {slideImages[index].body}
                  </h5>
                  <NavLink to={"/shop"}>
                    <Button variant="contained" color="primary">
                      Shop Now
                    </Button>
                  </NavLink>
                </div>
              </div>
            </Box>
          ))}
        </Slider>
      </Box>
      <Box className="my-5">
        <ListCategory categories={categories} listProduct={listProduct} />
      </Box>
      <Box className="my-5">
        <Box alignContent="center" sx={{ marginTop: 10 }}>
          <FeatureCollection />
          <Box sx={{ overflow: "hidden" }}>
            <ListProductComponent listProduct={listNewProduct} />
          </Box>
        </Box>
      </Box>
      <Box className="my-5">
        <Collection />
      </Box>
      <Box className="my-5">
        <Box alignContent="center" sx={{ marginTop: 10 }}>
          <PopularProducts />
          <Box sx={{ overflow: "hidden", paddingBottom: "30px" }}>
            <ListProductComponent listProduct={listPopularProduct} />
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Home;
