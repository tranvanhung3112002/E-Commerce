import { Box, CardMedia, Typography } from "@mui/material";
import { useContext } from "react";
import Slider from "react-slick";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../dialogproduct.module.css";
import { ProductItemContext } from "../../index";

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

const ImageDialogComponent = () => {
  const productItem = useContext(ProductItemContext);
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

  return (
    <div className={styles.slidercontainer}>
      <Box className="my-2">
        <Slider {...settings}>
          {productItem &&
            productItem.images.map((item, index) => (
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
        <Box className={styles.viewDetail}>
          <Typography align="center" margin="auto">
            View details
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default ImageDialogComponent;
