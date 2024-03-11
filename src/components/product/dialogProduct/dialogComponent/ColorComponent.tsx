import { Box, Chip } from "@mui/material";
import { useContext, useState } from "react";
import { ProductItemContext } from "../../index";
import { Colors } from "../../../../constants/Color";
// import { Colors } from "../../../../constants/Color";
type ColorType = keyof typeof Colors;

const ColorComponent = () => {
  const productItem = useContext(ProductItemContext);
  const [activeColor, setActiveColor] = useState<string>(
    productItem ? productItem.color[0] : ""
  );
  const handleClickColor = (color: string) => {
    console.log(color);
    setActiveColor(color);
  };

  console.log(activeColor);
  return (
    productItem && (
      <Box className="d-flex">
        {productItem.color.map((color: string, index: number) => {
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
    )
  );
};

export default ColorComponent;
