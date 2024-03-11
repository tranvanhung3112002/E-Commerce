import { Box } from "@mui/material";
import React, { useState } from "react";

const AddToCartComponent = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setQuantity(value);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <>
      <Box className="d-flex col-3">
        <span
          className="input-group-text rounded-0 rounded-start align-items-center"
          onClick={handleDecreaseQuantity}
          style={{ width: "20px" }}
        >
          -
        </span>
        <input
          type="text"
          className="form-control text-center rounded-0"
          value={quantity}
          aria-label="Quantity"
          aria-describedby="decrement increment"
          onChange={handleQuantityChange}
          style={{ width: "35px" }}
        />
        <span
          className="input-group-text rounded-0 rounded-end"
          onClick={handleIncreaseQuantity}
          style={{ width: "20px" }}
        >
          +
        </span>
      </Box>
      <Box className="d-flex col-9">
        <button
          type="button"
          className="btn btn-primary me-2"
          style={{ width: "106px" }}
        >
          Add to cart
        </button>
        <button
          type="button"
          className="btn btn-success"
          style={{ width: "106px" }}
        >
          Buy now
        </button>
      </Box>
    </>
  );
};

export default AddToCartComponent;
