import { IProduct } from "../../../types/Models";
import { CardMedia } from "@mui/material";
import styles from "../product.module.css";
import { useNavigate } from "react-router-dom";
interface ProductImageProps {
  productItem: IProduct;
  hoverState: boolean;
}

const ImageProductComponent = ({
  productItem,
  hoverState,
}: ProductImageProps) => {
  const navigate = useNavigate();
  const handleClick = (productItem: IProduct) => {
    navigate(`/E-Commerce/product/${productItem.id}`, { state: productItem });
  };
  return (
    <>
      <CardMedia
        component="img"
        height="250"
        image={!hoverState ? productItem.images[0] : productItem.images[1]}
        alt={productItem.name}
        className={hoverState ? styles.productImageHover : styles.productImage}
        onClick={() => handleClick(productItem)}
      ></CardMedia>
    </>
  );
};

export default ImageProductComponent;
