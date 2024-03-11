import { Button, Drawer, Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";

// import { useSelector } from "react-redux";
// import { RootState } from "../../features/Redux/Store/store";
import { IProduct } from "../../types/Models";

import * as SortProduct from "../../features/sortProduct/SortProduct";
import * as FilterProduct from "../../features/filterProduct/FilterProduct";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Shop.module.css";
import FilterProductComponent from "./component/FilterProductComponent";
import OptionViewComponent from "./component/OptionViewComponent";
import ListProductPage from "./component/ListProductPage";
import PaginationComponent from "../pagination/PaginationComponent";

interface ListProductProps {
  listProduct: IProduct[];
}
const ListProductShop = ({ listProduct }: ListProductProps) => {
  const [listProductShop, setListProductShop] = useState<IProduct[]>([]);
  const [listProductPage, setListProductPage] = useState<IProduct[]>([]);

  const [productQuantity, setProductQuantity] = useState<number>(9);
  const [productLine, setProductLine] = useState<number>(4);
  const [stateFilterPeice, setFilterPrice] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [checkBoxOnSale, setCheckBoxOnSale] = useState<boolean>(false);
  const [checkBoxInStock, setCheckBoxInStock] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const hanldeSelectProductQuantity = (value: number) => {
    setProductQuantity(value);
  };

  const handleProductLine = (value: number) => {
    setProductLine(value);
  };

  const handleSelectSort = (vallue: string) => {
    if (vallue === "1") {
      setListProductShop(listProduct);
    }
    if (vallue === "2") {
      const newListProductShop = [...listProductShop].sort(
        SortProduct.SortLowToHigh
      );
      setListProductShop(newListProductShop);
    }
    if (vallue === "3") {
      const newListProductShop = [...listProductShop].sort(
        SortProduct.SortHighToLow
      );
      setListProductShop(newListProductShop);
    }
    if (vallue === "4") {
      const newListProductShop = [...listProductShop].sort(
        SortProduct.SortByAverageRating
      );
      setListProductShop(newListProductShop);
    }
    if (vallue === "5") {
      const newListProductShop = [...listProductShop].filter((item) =>
        SortProduct.SortHot(item)
      );
      setListProductShop(newListProductShop);
    }
  };

  const handleFilterPrice = (value: number[]) => {
    setFilterPrice(value);
    if (
      value[0] < stateFilterPeice[0] ||
      value[1] < stateFilterPeice[0] ||
      value[0] > stateFilterPeice[0] ||
      value[1] > stateFilterPeice[0]
    ) {
      const newLisProductShop = FilterProduct.FilterByPrice(
        [...listProduct],
        value
      );
      setListProductShop(newLisProductShop);
    } else {
      const newLisProductShop = FilterProduct.FilterByPrice(
        [...listProductShop],
        value
      );
      setListProductShop(newLisProductShop);
    }
  };

  const handleFilterProductColor = (listFilterProductColor: IProduct[]) => {
    setListProductShop(listFilterProductColor);
  };

  const handleFilterProductSize = (listFilterProductSize: IProduct[]) => {
    setListProductShop(listFilterProductSize);
  };

  useEffect(() => {
    setListProductShop(listProduct);
  }, [listProduct]);

  const handleClear = () => {
    setListProductShop(listProduct);
    setCheckBoxOnSale(false);
    setCheckBoxInStock(false);
  };

  const handleOnSale = (onSale: boolean) => {
    setListProductShop(FilterProduct.FilterProductOnSale(listProductShop));
    setCheckBoxOnSale(onSale);
  };

  const handleInStock = (inStock: boolean) => {
    if (inStock) {
      setListProductShop(FilterProduct.FilterProductInStock(listProductShop));
      setCheckBoxInStock(inStock);
    }
  };

  const handleListProductPage = (value: IProduct[]) => {
    setListProductPage(value);
  };
  return (
    <Grid container spacing={2}>
      <Box className="d-block d-xl-none">
        <Button variant="text" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </Button>
        <Drawer
          open={open}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              overflow: "hidden",
            },
          }}
        >
          <Box className="d-flex justify-content-end">
            <Button
              variant="text"
              onClick={toggleDrawer(false)}
              className="mt-2"
            >
              <CloseIcon />
            </Button>
          </Box>
          <hr />
          <Box
            sx={{ width: "300px", padding: "20px 20px" }}
            className={styles.filterDrawer}
          >
            <FilterProductComponent
              listProductShop={listProductShop}
              onhandleFilterPrice={handleFilterPrice}
              onhandleFilterColor={handleFilterProductColor}
              onhandleFilterSize={handleFilterProductSize}
              onhandleOnSale={handleOnSale}
              isCheckedOnSaleProps={checkBoxOnSale}
              onhandleInStock={handleInStock}
              isCheckedInStockProps={checkBoxInStock}
            />
          </Box>
        </Drawer>
      </Box>

      <Grid
        item
        lg={3}
        xs={0}
        display="flex"
        alignItems="center"
        className="d-none d-xl-block"
      >
        <FilterProductComponent
          listProductShop={listProductShop}
          onhandleFilterPrice={handleFilterPrice}
          onhandleFilterColor={handleFilterProductColor}
          onhandleFilterSize={handleFilterProductSize}
          onhandleOnSale={handleOnSale}
          isCheckedOnSaleProps={checkBoxOnSale}
          onhandleInStock={handleInStock}
          isCheckedInStockProps={checkBoxInStock}
        />
      </Grid>
      <Grid item lg={9} xs={12}>
        <OptionViewComponent
          onhandleProductQuantity={hanldeSelectProductQuantity}
          onhandleProductLine={handleProductLine}
          onSelectSort={handleSelectSort}
        />
        {listProductShop.length !== listProduct.length && (
          <button
            type="button"
            className="btn btn-outline-secondary ms-3 border-0 fw-bold border-bottom"
            onClick={handleClear}
          >
            Clear <strong>X</strong>
          </button>
        )}
        <Box>
          <Grid container>
            <Grid xs={12} item>
              <ListProductPage
                listProductPage={listProductPage}
                productLine={productLine}
              />
            </Grid>
          </Grid>
        </Box>
        <PaginationComponent
          arr={listProductShop}
          quantityPage={productQuantity}
          handleNewListPage={handleListProductPage}
        />
      </Grid>
    </Grid>
  );
};

export default ListProductShop;
