import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/Redux/Store/store";
import {
  Box,
  // Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  // TableFooter,
  // TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import styles from "./Pucharse.module.css";
import { IPucharse } from "../../types/Models";
import NavShopPurchase from "../../components/navShop/NavShopPurchase";
import { useDispatch } from "react-redux";
import { handlePucharseByUser } from "../../features/Redux/Reducers/pucharseSlice";
import PaginationComponent from "../../components/pagination/PaginationComponent";
const index = () => {
  const dispatch = useDispatch();
  const [newListPucharseByUser, setNewListPucharseByUser] = useState([]);
  const [purchasePage, setPurchasePage] = useState([]);
  const listPucharse: IPucharse[] = useSelector(
    (state: RootState) => state.reducer.pucharseSlice.listPucharse
  );
  const login = useSelector(
    (state: RootState) => state.reducer.loginSlice.user
  );
  const listPucharseByUser: IPucharse[] = useSelector(
    (state: RootState) => state.reducer.pucharseSlice.pucharseByUser
  );
  const listProduct = useSelector(
    (state: RootState) => state.reducer.productSlice.listProduct
  );

  useEffect(() => {
    dispatch(handlePucharseByUser(login.id));
  }, [listPucharse]);
  useEffect(() => {
    const res = listPucharseByUser.map((pucharse) => {
      // let newList: any;
      const productsNewOrder = pucharse.productsOrder.map((item) => {
        let newItem;
        listProduct.forEach((product) => {
          if (product.id === item.productId) {
            newItem = {
              ...product,
              ...item,
            };
            return newItem;
          }
        });
        return newItem;
      });
      return { ...pucharse, productsOrder: productsNewOrder };
    });

    const listNewPucharse: any = [...res];
    setNewListPucharseByUser(listNewPucharse);
  }, [listPucharseByUser]);

  const handleNewListPage = (value: any) => {
    setPurchasePage(value);
  };
  return (
    <>
      <NavShopPurchase />
      <Grid
        container
        justifyContent={"center"}
        sx={{
          width: "100%",
          backgroundColor: "#f5f5f5",
          paddingBottom: "80px",
        }}
      >
        {purchasePage.map((data: any, index) => (
          <Grid
            item
            key={index}
            xs={8}
            justifyContent={"center"}
            sx={{ border: "1px solid #ccc", marginBottom: "20px" }}
          >
            <Box
              sx={{
                width: "100%",
                backgroundColor: "#fff",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ paddingX: "16px" }}
              >
                <Typography variant="h6">WoodMart</Typography>
                <Typography component="p">Giao hàng thành công</Typography>
              </Stack>
            </Box>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500, border: "none" }}
                aria-label="custom pagination table"
              >
                <TableBody>
                  {data.productsOrder.map((product: any) => (
                    <TableRow
                      sx={{ border: "1px solid #fff", borderRadius: "none" }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "none",
                          borderRadius: "none",
                        }}
                      >
                        <div>
                          {" "}
                          <img
                            src={product.images[0]}
                            alt=""
                            className={styles.img}
                          />
                        </div>
                        <div>
                          <p
                            className={styles.name}
                          >{`${product.name} - ${product.size} - months, ${product.color}`}</p>
                          <p
                            className={styles.quantity}
                            style={{ marginBottom: "0", marginTop: "8px" }}
                          >
                            {`${product.quantityOrder} x`}
                            <span
                              className={styles.price}
                            >{` $${product.price}`}</span>
                          </p>
                        </div>
                      </TableCell>

                      <TableCell
                        style={{ width: 160 }}
                        sx={{ border: "none", borderRadius: "none" }}
                        align="right"
                      >
                        <Typography component="p">
                          <span className={styles.price}>
                            {" "}
                            ${product.price * product.quantityOrder}
                          </span>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography
              component="p"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingTop: "20px",
                paddingRight: "16px",
                backgroundColor: "#fff",
              }}
            >
              Order Total :{" "}
              <span className={styles.total}>
                $
                {data.productsOrder.reduce(
                  (acc: any, item: any) =>
                    acc + item.price * item.quantityOrder,
                  0
                )}
              </span>
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Box className={styles.pagination}>
        <PaginationComponent
          arr={newListPucharseByUser}
          quantityPage={3}
          handleNewListPage={handleNewListPage}
        />
      </Box>
    </>
  );
};

export default index;
