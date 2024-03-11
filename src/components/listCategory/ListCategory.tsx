// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ICategory, IProduct } from "../../types/Models";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
interface IListCategory {
  categories: ICategory[];
  listProduct: IProduct[];
}

const ListCategory = ({ categories, listProduct }: IListCategory) => {
  const navigate = useNavigate();
  const handleNavigate = (value: string) => {
    console.log(value);

    const listProductCategory = listProduct.filter(
      (p) => p.categoryName === value
    );
    navigate(`/E-Commerce/category/${value}`, { state: listProductCategory });
  };
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 0,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Grid
      sx={{
        width: "98%",
        boxSizing: "border-box",
        margin: "0",
        paddingLeft: "24px",
        marginTop: "75px",
      }}
    >
      <Slider {...settings}>
        {categories.map((category) => (
          <Grid
            item
            md={2}
            key={category.id}
            sx={{ padding: "0 8px", position: "relative", cursor: "pointer" }}
          >
            <Avatar
              onClick={() => handleNavigate(category.name)}
              alt={category.name}
              src={category.image}
              sx={{ height: "100%", width: "100%" }}
            ></Avatar>
            <Typography
              component="span"
              sx={{
                position: "absolute",
                right: "50%",
                bottom: "50%",
                transform: "translate(50%, 50%)",
                fontSize: "24px",
                padding: "8px 16px",
                backgroundColor: "#fff",
                color: "#000",
                borderRadius: "32px",
              }}
            >
              {category.name}
            </Typography>
          </Grid>
        ))}
      </Slider>
    </Grid>
  );
};

export default ListCategory;
