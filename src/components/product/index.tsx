import { createContext, useState } from "react";
import { IProduct } from "../../types/Models";
import styles from "./product.module.css";
import { Box, Card, CardContent, Grid } from "@mui/material";
import StateProductComponent from "./productComponent/StateProductComponent";
import OptionsBarComponent from "./productComponent/OptionsBarComponent";
import ImageProductComponent from "./productComponent/ImageProductComponent";
import ContentProductComponent from "./productComponent/ContentProductComponent";

interface ProductItemProps {
  productItem: IProduct;
}

export const ProductItemContext = createContext<IProduct | undefined>(
  undefined
);

const ProductItemComponent = ({ productItem }: ProductItemProps) => {
  const [hoverState, setHoverState] = useState<boolean>(false);
  const handleMouseEnter = () => {
    setHoverState(true);
  };

  const handleMouseLeave = () => {
    setHoverState(false);
  };

  return (
    <ProductItemContext.Provider value={productItem}>
      <Grid
        item
        key={productItem.id}
        sx={{ padding: 1.5, cursor: "pointer" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box>
          <Card>
            <Box position="relative">
              <Box className={styles.stateProduct}>
                <StateProductComponent stateProduct={productItem.state} />
              </Box>
              <Box className={styles.productImageContainer}>
                <ImageProductComponent
                  hoverState={hoverState}
                  productItem={productItem}
                />
              </Box>
              <Box className={styles.optionBarContainer}>
                <Grid
                  className={
                    !hoverState ? styles.optionBar : styles.optionBarHover
                  }
                >
                  <OptionsBarComponent productItem={productItem} />
                </Grid>
              </Box>
            </Box>
            <CardContent sx={{ height: 120 }}>
              <ContentProductComponent productItem={productItem} />
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </ProductItemContext.Provider>
  );
};

export default ProductItemComponent;
