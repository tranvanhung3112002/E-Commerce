import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

import { RootState } from "../../features/Redux/Store/store";
import { useSelector } from "react-redux";
import {
  handleDeleteProduct,
  handleIncreaseQuantity,
  handleReduceQuantity,
} from "../../features/Redux/Reducers/cartSlice";
import { useDispatch } from "react-redux";
import styles from "./Cart.module.css";
import { IProductCart } from "../../types/Models";
import { useNavigate } from "react-router-dom";
import NavShop from "../../components/navShop";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(
    (state: RootState) => state.reducer.cartSlice.listProductCart
  );
  const listProduct = useSelector(
    (state: RootState) => state.reducer.productSlice.listProduct
  );
  const [newCart, setNewCart] = useState([]);
  useEffect(() => {
    const result = cart.map((item) => {
      let newItem: IProductCart | undefined;
      listProduct.forEach((product) => {
        if (product.id === item.id) {
          newItem = {
            ...product,
            ...item,
          };
          return newItem;
        }
      });
      return newItem;
    });

    const listCart: any = result.filter(
      (item) => item !== undefined
    ) as IProductCart[];
    setNewCart(listCart);
  }, [cart]);
  console.log(newCart);

  const sumTotal = newCart?.reduce((total, item: any) => {
    return (
      total + item.quantity * (item.price - (item.price * item.discount) / 100)
    );
  }, 0);

  const sumTotalFixed = sumTotal.toFixed(2);

  const [shippingOption, setShippingOption] = useState("");

  const handleChange = (event: any) => {
    setShippingOption(event.target.value);
  };

  const navigate = useNavigate();
  const handleCheckout = () => {
    if (newCart.length === 0) {
      toast.error("Cart is empty", {
        theme: "colored",
        icon: false,
      });
      return;
    }

    navigate("/E-Commerce/checkout");
  };

  return (
    <Box>
      <ToastContainer />

      <NavShop />
      <Grid container>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>PRODUCT</TableCell>
                  <TableCell>COLOR</TableCell>
                  <TableCell>SIZE</TableCell>
                  <TableCell>PRICE</TableCell>
                  <TableCell>QUANTITY</TableCell>
                  <TableCell align="right">SUBTOTAL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newCart &&
                  newCart?.map((item: any) => (
                    <TableRow
                      key={item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">
                        <span className={styles.deleteIcon}>
                          <i
                            onClick={() => dispatch(handleDeleteProduct(item))}
                            className="fa-solid fa-xmark mx-2"
                          ></i>
                        </span>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <img
                          src={item.images[0]}
                          alt=""
                          className={styles.img}
                        />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.color}</TableCell>
                      <TableCell>{`${item.size} months`}</TableCell>

                      <TableCell>
                        <Typography
                          variant="body2"
                          className={styles.price}
                        >{`$${
                          item.price - (item.price * item.discount) / 100
                        }`}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <div className={styles.quantity}>
                          <button
                            className={styles.button}
                            onClick={() =>
                              item.quantity! > 1 &&
                              dispatch(
                                handleReduceQuantity({
                                  id: item.id,
                                  size: item.size,
                                  color: item.color,
                                })
                              )
                            }
                          >
                            -
                          </button>
                          {item.quantity}
                          <button
                            className={styles.button}
                            onClick={() =>
                              dispatch(
                                handleIncreaseQuantity({
                                  id: item.id,
                                  size: item.size,
                                  color: item.color,
                                })
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </TableCell>
                      <TableCell className="text-primary  " align="right">
                        <b>{`$${
                          item.quantity *
                          (item.price - (item.price * item.discount) / 100)
                        }`}</b>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <article className={styles.cartTotals}>
            <h5 className="mb-5">CART TOTALS</h5>
            <Grid container>
              <Grid item xs={4}>
                <Typography variant="h6">Subtotal</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  align="right"
                  variant="body1"
                  className={styles.price}
                >
                  ${sumTotalFixed}
                </Typography>
              </Grid>
            </Grid>
            <hr />
            <Grid container>
              <Grid item xs={4} className={styles.shippingText}>
                <Typography variant="h6">Shipping</Typography>
              </Grid>
              <Grid item xs={8}>
                <Grid container direction="row-reverse">
                  <Grid item>
                    <FormControl
                      component="fieldset"
                      className={styles.formShip}
                    >
                      <FormLabel component="legend"></FormLabel>
                      <RadioGroup
                        value={shippingOption}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="rate"
                          control={<Radio size="small" />}
                          label="Flat rate"
                          className={styles.shipLabel}
                        />
                        <FormControlLabel
                          value="free"
                          control={<Radio size="small" />}
                          label="Free shipping"
                          className={styles.shipLabel}
                        />
                        <FormControlLabel
                          value="local"
                          control={<Radio size="small" />}
                          label="Local pickup"
                          className={styles.shipLabel}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">
                      Shipping options will be updated during checkout.
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" className="text-primary mx-4">
                      Calculate shipping
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <hr />
            <Grid container className="my-2">
              <Grid item xs={4}>
                <Typography variant="h6">Total</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  variant="h6"
                  className="text-primary mx-4"
                  align="right"
                >
                  ${sumTotalFixed}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <button onClick={handleCheckout} className="btn btn-primary">
                Proceed to checkout
              </button>
            </Grid>
          </article>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
