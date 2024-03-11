import {
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { IProduct } from "../../../types/Models";
import {
  FilterProductColor,
  FilterProductSize,
  colortFilterArray,
  sizeFilterArray,
} from "../../../features/filterProduct/FilterProduct";
import styles from "../Shop.module.css";
import { Colors } from "../../../constants/Color";

interface LisProductProps {
  listProductShop: IProduct[];
  onhandleFilterPrice(value: number[]): void;
  onhandleFilterColor(filterProductColor: IProduct[]): void;
  onhandleFilterSize(filterProductSize: IProduct[]): void;
  onhandleOnSale(onSale: boolean): void;
  onhandleInStock(inStock: boolean): void;
  isCheckedOnSaleProps: boolean;
  isCheckedInStockProps: boolean;
}
type ColorType = keyof typeof Colors;

const FilterProductComponent = ({
  listProductShop,
  onhandleFilterPrice,
  onhandleFilterColor,
  onhandleFilterSize,
  onhandleOnSale,
  isCheckedOnSaleProps,
  isCheckedInStockProps,
  onhandleInStock,
}: LisProductProps) => {
  const [value, setValue] = React.useState<number[]>([0, 200]);
  const allProductColor = colortFilterArray(listProductShop);
  const allSizeProduct = sizeFilterArray(listProductShop);

  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log(event);

    setValue(newValue as number[]);
  };

  const [activeColor, setActiveColor] = useState<string>("");
  const handleClickColor = (color: string) => {
    if (color === activeColor) {
      setActiveColor("");
    } else {
      setActiveColor(color);
    }
  };

  const handleOnSale = (event: React.ChangeEvent<HTMLInputElement>) => {
    onhandleOnSale(event.target.checked);
  };

  const handleInStock = (event: React.ChangeEvent<HTMLInputElement>) => {
    onhandleInStock(event.target.checked);
  };

  return (
    <Box className="my-2 cursor-pointer">
      <Box className="mb-4">
        <Typography variant="h6">Filter by price</Typography>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={0}
          max={200}
        />
        <Box className="d-flex justify-content-between">
          <Box>
            <Typography component="span" marginRight="10px">
              Price
            </Typography>
            <Typography component="span" fontWeight="500" fontSize="20px">
              ${value[0]}-${value[1]}
            </Typography>
          </Box>
          <button
            className="btn btn-light"
            onClick={() => onhandleFilterPrice(value)}
          >
            Filter
          </button>
        </Box>
      </Box>
      <hr />
      <Box className="mb-4" sx={{ cursor: "pointer" }}>
        <Typography variant="h6">Filter by color</Typography>
        <Box className={styles.filterColor}>
          {allProductColor.map((color: string, index: number) => {
            const colorKey = color as ColorType;
            return (
              <Box
                key={index}
                className={`d-flex justify-content-between my-3 ${styles.filterColorItem}`}
                onClick={() => {
                  handleClickColor(color);
                  onhandleFilterColor(
                    FilterProductColor(listProductShop, color)
                  );
                }}
              >
                <Box className="d-flex">
                  <Box
                    className={
                      activeColor === color
                        ? "border-bottom border-2 border-secondary"
                        : ""
                    }
                  >
                    <Chip
                      key={index}
                      sx={{
                        width: "1.5rem",
                        height: "1.5rem",
                        backgroundColor: Colors[colorKey],
                      }}
                      className="rounded-circle"
                    />
                  </Box>
                  <Typography
                    component="span"
                    className="ms-3 text-capitalize pt-1"
                  >
                    {color}
                  </Typography>
                </Box>
                <Chip
                  label={FilterProductColor(listProductShop, color).length}
                  size="small"
                  className={styles.colorQuantity}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
      <hr />
      <Box className="mb-4" sx={{ cursor: "pointer" }}>
        <Typography variant="h6">Filter by Size</Typography>
        <Box className={styles.filterSize}>
          {allSizeProduct.map((size: string, index: number) => {
            return (
              <Box
                key={index}
                className={`d-flex justify-content-between my-3 ${styles.filterSizeItem}`}
                onClick={() => {
                  onhandleFilterSize(FilterProductSize(listProductShop, size));
                }}
              >
                <Box className="d-flex">
                  <Typography component="span" className="text-capitalize pt-1">
                    {size} Months
                  </Typography>
                </Box>
                <Chip
                  label={FilterProductSize(listProductShop, size).length}
                  size="small"
                  className={styles.sizeQuantity}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
      <hr />
      <Box>
        <Typography variant="h6">Stock status</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={isCheckedOnSaleProps}
                onChange={handleOnSale}
              />
            }
            label="On sale"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isCheckedInStockProps}
                onChange={handleInStock}
              />
            }
            label="In stock"
          />
        </FormGroup>
      </Box>
    </Box>
  );
};

export default FilterProductComponent;
