import { IProduct } from "../../../types/Models";
import { Box, Rating, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ProductItemProps {
  productItem: IProduct;
}

const ContentProductComponent = ({ productItem }: ProductItemProps) => {
  const navigate = useNavigate();
  const handleClick = (productItem: IProduct) => {
    navigate(`/product/${productItem.id}`, { state: productItem });
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      onClick={() => handleClick(productItem)}
    >
      <Typography component="span" align="center">
        {productItem.name}
      </Typography>
      <Box display="flex" justifyContent="center">
        <Rating
          name="simple-controlled"
          value={productItem.rating.rate}
          size="small"
        />
      </Box>
      <Typography
        component="span"
        align="center"
        color="primary"
        fontWeight="bold"
        className="my-2"
      >
        $
        {(
          productItem.price -
          productItem.price * (productItem.discount / 100)
        ).toFixed(2)}
      </Typography>
    </Box>
  );
};

export default ContentProductComponent;
