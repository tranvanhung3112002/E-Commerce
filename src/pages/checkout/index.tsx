import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  // FormikProps,
  // FormikValues,
} from "formik";
import { useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  handleClearCart,
  handleDeleteProduct,
  handleIncreaseQuantity,
  handleReduceQuantity,
} from "../../features/Redux/Reducers/cartSlice";
import { RootState } from "../../features/Redux/Store/store";
import { IProductCart } from "../../types/Models";
import NavShop from "../../components/navShop";
// import HeaderTab from "../../components/Header/HeaderTab";
import { getDay } from "../detailProduct/components/Review";
import { handlePostPucharse } from "../../features/Redux/Reducers/pucharseSlice";
import { handlegetOpenLogin } from "../../features/Redux/Reducers/loginSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

interface DetailForm {
  firstName: string;
  lastName: string;
  companyName: string;
  city: string;
  address: string;
  phone: number;
  email: string;
  orderNotes: string;
}

interface IOD {
  productId: string;
  quantityOrder: number;
  size: string;
  color: string;
  price: number;
}

const Checkout = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const handleLinkClick = () => {
    setIsExpanded(!isExpanded);
  };

  const validate = (values: DetailForm) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors: any = {};
    if (!values.firstName) {
      errors.firstName = "firstName is required";
    }
    if (!values.lastName) {
      errors.lastName = "lastName is required";
    }
    if (!values.city) {
      errors.city = "city is required";
    }
    if (!values.address) {
      errors.address = "address is required";
    }
    if (!values.phone) {
      errors.phone = "phone is required";
    }
    if (!values.email) {
      errors.email = "email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "invalid email address";
    }
    return errors;
  };

  const handleSubmit = (
    values: DetailForm,
    formikHelper: FormikHelpers<DetailForm>
  ) => {
    console.log("submitValue: ", values);

    formikHelper.resetForm();
  };

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

  const userLogin = useSelector(
    (state: RootState) => state.reducer.loginSlice.user
  );
  // const listCart = useSelector(
  //   (state: RootState) => state.reducer.cartSlice.listProductCart
  // );

  const arr = newCart.map((item: any) => {
    let data: IOD = {
      productId: item.id,
      quantityOrder: item.quantity,
      size: item.size,
      color: item.color,
      price: item.price,
    };
    return data;
  });
  const handleCheckout = (e: any) => {
    e.preventDefault();
    if (newCart.length > 0) {
      if (userLogin.id !== undefined && userLogin.id !== "") {
        const data = {
          // id: nanoid(),
          userId: userLogin.id,
          productsOrder: [...arr],
          totalPrice: arr.reduce(
            (acc: any, item: any) => acc + item.price * item.quantity,
            0
          ),
          totalQuantityOrder: arr.reduce(
            (acc: any, item: any) => acc + item.quantity,
            0
          ),
          date: getDay(),
        };
        dispatch(handlePostPucharse(data));
        dispatch(handleClearCart());
        navigate("/E-Commerce/pucharse");
        toast.success("Successful purchase", {
          theme: "colored",
          icon: false,
        });
      } else {
        dispatch(handlegetOpenLogin());
      }
    } else {
      toast.error("Cart is empty", {
        theme: "colored",
        icon: false,
      });
      return;
    }
  };
  return (
    <div>
      <ToastContainer />
      <NavShop />
      <div className="mx-4">
        <Grid container className={styles.addCoupon}>
          <Typography variant="body2">
            Have a coupon?
            <Link href="#" onClick={handleLinkClick}>
              Click here to enter your code
            </Link>
          </Typography>
          {isExpanded && (
            <Grid container className="my-3">
              <Grid item className={styles.inputCoupon} xs={4}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="body2" className={styles.textCoupon}>
                      If you have a coupon code, please apply it below.
                    </Typography>
                  </Grid>
                  <Grid container item xs={10} spacing={2}>
                    <Grid item xs={9}>
                      <form>
                        <TextField
                          label="Coupon Code"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </form>
                    </Grid>
                    <Grid item xs={3}>
                      <Button variant="contained" color="primary">
                        Button
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={8}></Grid>
            </Grid>
          )}
        </Grid>

        <Grid container>
          {/* BILLING DETAILS */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6">BILLING DETAILS</Typography>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                companyName: "",
                city: "",
                address: "",
                phone: 0,
                email: "",
                orderNotes: "",
              }}
              validate={validate}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <Grid container spacing={3}>
                    {/* FirstName */}
                    <Grid item xs={12} md={6}>
                      <div className="form-group">
                        <label htmlFor="firstName" className={styles.label}>
                          First name:
                          <Field
                            type="text"
                            name="firstName"
                            className="form-control"
                            placeholder="Enter first name..."
                          />
                        </label>
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </Grid>

                    {/* LastName */}
                    <Grid item xs={12} md={6}>
                      <div className="form-group">
                        <label htmlFor="lastName" className={styles.label}>
                          Last name:
                          <Field
                            type="text"
                            name="lastName"
                            className="form-control"
                            placeholder="Enter last name..."
                          />
                        </label>
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </Grid>
                  </Grid>

                  {/* CompanyName */}
                  <div className="form-group">
                    <label htmlFor="companyName" className={styles.label}>
                      Company name:
                      <Field
                        type="text"
                        name="companyName"
                        className="form-control"
                        placeholder="Enter company name"
                      />
                    </label>
                    <ErrorMessage
                      name="companyName"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  {/* City */}
                  <div className="form-group">
                    <label htmlFor="city" className={styles.label}>
                      City:
                      <Field
                        type="text"
                        name="city"
                        className="form-control"
                        placeholder="Enter city"
                      />
                    </label>
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  {/* Address */}
                  <div className="form-group">
                    <label htmlFor="address" className={styles.label}>
                      Address:
                      <Field
                        type="text"
                        name="address"
                        className="form-control"
                        placeholder="Enter address"
                      />
                    </label>
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <label htmlFor="phone" className={styles.label}>
                      Phone:
                      <Field
                        type="number"
                        name="phone"
                        className="form-control"
                        placeholder="Enter phone"
                      />
                    </label>
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="email" className={styles.label}>
                      Email:
                      <Field
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                      />
                    </label>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  {/* BUTTON */}
                  <button type="submit" className="btn btn-success mx-2">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </Grid>

          {/* YOUR ORDER */}
          <Grid item xs={12} md={6} className={styles.yourOrder}>
            <Typography variant="h6" className="text-center my-3">
              YOUR ORDER
            </Typography>
            <Grid container>
              <TableContainer component={Paper} className="mx-3">
                <Table sx={{}} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: { xs: "10px" } }}></TableCell>
                      <TableCell>PRODUCT</TableCell>
                      <TableCell></TableCell>
                      <TableCell align="right">SUBTOTAL</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {newCart &&
                      newCart?.map((item: any) => (
                        <TableRow
                          key={item.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            sx={{ width: { xs: "10px" } }}
                            align="right"
                          >
                            <span className={styles.deleteIcon}>
                              <i
                                onClick={() =>
                                  dispatch(handleDeleteProduct(item))
                                }
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
                          <TableCell>
                            {item.name}
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
                          <TableCell align="right">
                            {`$${
                              item.quantity *
                              (item.price - (item.price * item.discount) / 100)
                            }`}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <hr />
                <Grid container>
                  <Grid item xs={4} className={styles.shippingText}>
                    <Typography variant="h6" className="px-5">
                      Shipping
                    </Typography>
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
                    </Grid>
                  </Grid>
                </Grid>
                <hr />
                <Grid container className="my-4">
                  <Grid item xs={4}>
                    <Typography variant="h6" className="px-5">
                      <b>Total</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="h6"
                      align="right"
                      className="px-4 text-primary"
                    >
                      ${sumTotalFixed}
                    </Typography>
                  </Grid>
                </Grid>
              </TableContainer>
              <div className={styles.btnOrder}>
                <button
                  style={{ width: "100%", height: "100%" }}
                  className="btn btn-primary"
                  onClick={handleCheckout}
                >
                  Place order
                </button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Checkout;
