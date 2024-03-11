import {
  Box,
  CardMedia,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
  TableContainer,
  Typography,
} from "@mui/material";
import { Fragment, useContext, useState } from "react";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductItemContext } from "../../components/product";
import { NavLink, useLocation } from "react-router-dom";
import styles from "../detailProduct/detailProduct.module.css";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import { IoMdHome } from "react-icons/io";
// import { FaShoppingBag } from "react-icons/fa";
// import { FaRegUser, FaSearch } from "react-icons/fa";
import Review from "./components/Review";
import RelatedProduct from "./components/RelatedProduct";

import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import XIcon from "@mui/icons-material/X";

import { FaLinkedinIn, FaTelegram } from "react-icons/fa6";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import React from "react";
import { Colors } from "../../constants/Color";
import { IProductCart } from "../../types/Models";
import { useDispatch } from "react-redux";
import { handleAddToCart } from "../../features/Redux/Reducers/cartSlice";
import "../detailProduct/detailProduct.module.css";
import ScrollToTop from "../../components/ScrollOnTop";
import ShoppingCart from "../../components/shoppingCart";
type ColorType = keyof typeof Colors;
const PrevArrow = (props: any) => {
  const { onClick, currentSlide } = props;
  if (currentSlide === 0) {
    return (
      <div onClick={onClick} className={styles.prevArrow}>
        <ArrowBackIosIcon fontSize="medium" sx={{ opacity: 0.1 }} />
      </div>
    );
  }
  return (
    <div onClick={onClick} className={styles.prevArrow}>
      <ArrowBackIosIcon fontSize="medium" />
    </div>
  );
};

const NextArrow = (props: any) => {
  const { onClick, currentSlide, slideCount } = props;
  if (currentSlide === slideCount - 1) {
    return (
      <div onClick={onClick} className={styles.nextArrow}>
        <ArrowForwardIosIcon fontSize="medium" sx={{ opacity: 0.1 }} />
      </div>
    );
  }
  return (
    <div onClick={onClick} className={styles.nextArrow}>
      <ArrowForwardIosIcon fontSize="medium" />
    </div>
  );
};

const DetailProduct = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  const dispatch = useDispatch();
  // const params = useParams();
  const location = useLocation();
  console.log(location.state);
  const [dataProductaddCart, setDataProductaddCart] = useState<IProductCart>({
    id: location.state.id,
    quantity: 1,
    color: "",
    size: "",
  });
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (!isNaN(value)) {
      // setQuantity(value);
    }
  };

  const handleIncreaseQuantity = () => {
    setDataProductaddCart({
      ...dataProductaddCart,
      quantity: dataProductaddCart.quantity + 1,
    });
  };

  const handleDecreaseQuantity = () => {
    if (dataProductaddCart.quantity > 1) {
      setDataProductaddCart({
        ...dataProductaddCart,
        quantity: dataProductaddCart.quantity - 1,
      });
    }
  };
  const productItem = useContext(ProductItemContext);
  const [size, setSize] = React.useState(
    productItem ? productItem.sizeProduct[0] : ""
  );
  const handleChange = (event: SelectChangeEvent) => {
    setSize(event.target.value);
    setDataProductaddCart({ ...dataProductaddCart, size: event.target.value });
  };
  const [activeColor, setActiveColor] = useState<string>(
    productItem ? productItem.color[0] : ""
  );
  const handleClickColor = (color: string) => {
    console.log(color);
    setActiveColor(color);
    setDataProductaddCart({ ...dataProductaddCart, color: color });
  };

  console.log(dataProductaddCart);
  const handleAddCart = () => {
    if (dataProductaddCart.color === "") {
      toast.error("Color is required", {
        theme: "colored",
        icon: false,
      });
      return;
    }
    if (dataProductaddCart.size === "") {
      toast.error("Size is required", {
        theme: "colored",
        icon: false,
      });
      return;
    }
    dispatch(handleAddToCart(dataProductaddCart));
    handleOpenShoppingCart();
  };
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);
  const handleOpenShoppingCart = () => {
    setIsShoppingCartOpen(true);
  };

  const handleCloseShoppingCart = () => {
    setIsShoppingCartOpen(false);
  };

  return (
    <Fragment>
      <ToastContainer />
      <ScrollToTop />
      {/* <Box>
        <HeaderTab />
      </Box> */}
      <TableContainer className={styles.hung}>
        <Box className="mx-5">
          <div className="nav-item d-flex">
            <NavLink to="/" className="nav-link active" aria-current="page">
              Home
            </NavLink>
            <NavLink to="/shop" className="nav-link">
              / Shop
            </NavLink>
            <p>
              {" "}
              / <strong>{location.state && location.state.name}</strong>
            </p>
          </div>
        </Box>
        <Grid container>
          <Box
            className={`${styles.slidercontainer} col-md-6 col-sm-12`}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Box className="col-8 ">
              <Box className="my-2">
                <Slider {...settings}>
                  {location.state &&
                    location.state.images.map((item: any, index: number) => (
                      <CardMedia
                        component="img"
                        image={item}
                        height="100%"
                        width="100%"
                        key={index}
                        className={styles.cardImage}
                      ></CardMedia>
                    ))}
                </Slider>
              </Box>
            </Box>
          </Box>
          <Box className="col-md-6 col-sm-12">
            <h3>{location.state && location.state.name}</h3>
            <Box
              display="flex"
              justifyContent="start"
              className="mb-3"
              alignItems="center"
            >
              <Rating
                name="simple-controlled"
                value={location.state.rating.rate}
                size="small"
              />
              <Typography className="ms-2">
                ({location.state.rating.count} customer review)
              </Typography>
            </Box>
            <Box className="mb-3">
              <Typography variant="h5" fontWeight="500" color="primary">
                $
                {(
                  location.state.price -
                  location.state.price * (location.state.discount / 100)
                ).toFixed(2)}
              </Typography>
            </Box>
            <Box className="mb-3">
              <Typography component="p" color="lightslategray">
                {location.state.description}
              </Typography>
            </Box>

            <Box className="d-flex">
              {" "}
              <Box className="d-flex col-3">
                <span
                  className="input-group-text rounded-0 rounded-start align-items-center"
                  onClick={handleDecreaseQuantity}
                  style={{ width: "10%", cursor: "pointer" }}
                >
                  -
                </span>
                <input
                  type="text"
                  className="form-control text-center rounded-0"
                  value={dataProductaddCart.quantity}
                  aria-label="Quantity"
                  aria-describedby="decrement increment"
                  onChange={handleQuantityChange}
                  style={{ width: "35px" }}
                />
                <span
                  className="input-group-text rounded-0 rounded-end"
                  onClick={handleIncreaseQuantity}
                  style={{ width: "10%", cursor: "pointer" }}
                >
                  +
                </span>
              </Box>
              <Box className="d-flex col-9">
                <button
                  type="button"
                  className="btn btn-primary me-2 "
                  style={{ width: "40%" }}
                  onClick={handleAddCart}
                >
                  Add to cart
                </button>
                <ShoppingCart
                  products={[
                    {
                      id: dataProductaddCart.id,
                      size: dataProductaddCart.size,
                      color: dataProductaddCart.color,
                      quantity: dataProductaddCart.quantity,
                    },
                  ]}
                  isOpen={isShoppingCartOpen}
                  onClose={handleCloseShoppingCart}
                />
                {/* <button
                  type="button"
                  className="btn btn-success "
                  style={{ width: "40%" }}
                >
                  Buy now
                </button> */}
              </Box>
            </Box>
            <Grid className="mt-3" container>
              <Grid item className="me-auto">
                <button
                  style={{ border: "none", background: "none" }}
                  className="me-3"
                >
                  <CompareArrowsIcon />
                  Compare
                </button>
                <button style={{ border: "none", background: "none" }}>
                  <FavoriteBorderIcon />
                  Add to wishlist
                </button>
              </Grid>
              <Grid item className="d-flex">
                <p className="me-2">Share:</p>
                <Grid container spacing={2}>
                  <Grid item>
                    <a
                      href="https://www.facebook.com/sharer/sharer.php?u=https://woodmart.xtemos.com/kids/about-us/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FacebookOutlinedIcon className={styles.facebook} />
                    </a>
                  </Grid>
                  <Grid item>
                    <a
                      href="https://x.com/share?url=https://woodmart.xtemos.com/kids/about-us/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <XIcon className={styles.icon} />
                    </a>
                  </Grid>

                  <Grid item>
                    <a
                      href="https://www.linkedin.com/shareArticle?mini=true&url=https://woodmart.xtemos.com/kids/about-us/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedinIn className={styles.ficon} />
                    </a>
                  </Grid>
                  <Grid item>
                    <a
                      href="https://telegram.me/share/url?url=https://woodmart.xtemos.com/kids/about-us/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTelegram className={styles.ficon} />
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box className="mb-3 d-flex" alignItems="center">
              <Typography component="span" fontSize="20px" fontWeight="500">
                Size:
              </Typography>
              <FormControl sx={{ m: 1, minWidth: "50%" }}>
                <Select
                  value={size}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="my-2"
                >
                  <MenuItem value="">
                    <em>Choose an option</em>
                  </MenuItem>
                  {location.state.sizeProduct.map(
                    (item: any, index: number) => (
                      <MenuItem value={item} key={index}>
                        {" "}
                        {item} Months
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Box className="mb-3 d-flex" alignItems="center">
                <Typography component="span" fontSize="20px" fontWeight="500">
                  Color:
                </Typography>
                <Box className="d-flex">
                  {location.state.color.map((color: string, index: number) => {
                    const colorKey = color as ColorType;
                    return (
                      <Box
                        key={index}
                        className={
                          activeColor === color
                            ? "border-bottom border-2 border-secondary ms-3"
                            : "ms-3"
                        }
                      >
                        <Chip
                          key={index}
                          onClick={() => handleClickColor(color)}
                          sx={{
                            width: "1.5rem",
                            height: "1.5rem",
                            backgroundColor: Colors[colorKey],
                          }}
                          className="rounded-circle"
                        />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
            <hr />
            <Box
              style={{
                background: "#e6edfa",
                height: "60px",
                display: "flex",
                alignItems: "center",
                borderRadius: "10px",
              }}
            >
              <p className="m-0">
                <RemoveRedEyeIcon className={styles.removeRedEyeIcon} />
                {location.state.rating.count} People rated this product
              </p>
            </Box>
            <Box className="d-flex p-4">
              <Box
                className="col-4 "
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <LocalFloristIcon
                  style={{ fontSize: "60px", color: "rgb(154 211 103)" }}
                />
                <p>100% Organic Cotton</p>
              </Box>
              <Box
                className="col-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <i
                  className="fa-solid fa-mitten"
                  style={{ fontSize: "60px", color: "rgb(154 211 103)" }}
                ></i>
                <p>Inbuilt Mittens</p>
              </Box>
              <Box
                className="col-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <i
                  className="fa-solid fa-user-tie"
                  style={{ fontSize: "60px", color: "rgb(154 211 103)" }}
                ></i>

                <p>Hospital Checklist</p>
              </Box>
            </Box>
          </Box>
        </Grid>
      </TableContainer>
      <Review idProduct={location.state.id} />
      <RelatedProduct category={location.state.categoryName} />
    </Fragment>
  );
};

export default DetailProduct;
