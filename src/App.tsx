import {
  // BrowserRouter as Router,
  Routes,
  Route,
  // BrowserRouter,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { handleProductsFetchRequest } from "./features/Redux/Reducers/productSlice";
import "./App.css";
import { handleGetCategories } from "./features/Redux/Reducers/categorySlice";
import DetailProduct from "./pages/detailProduct/DetailProduct";
import Cart from "./pages/cart";
import { handleLoginRequest } from "./features/Redux/Reducers/loginSlice";
import { handleGetReview } from "./features/Redux/Reducers/reviewSlice";
import { handleGetPucharse } from "./features/Redux/Reducers/pucharseSlice";
import Pucharse from "./pages/purcharse";
import Checkout from "./pages/checkout";
import { handleGetDataLocalStorage } from "./features/Redux/Reducers/cartSlice";
import CategoryProduct from "./pages/categoryProduct/CategoryProduct";
import HeaderTab from "./components/Header/HeaderTab";
import Footer from "./components/footer/Footer";

function App() {
  const dispatch = useDispatch();
  if (!localStorage.getItem("listProductCart")) {
    localStorage.setItem("listProductCart", JSON.stringify([]));
  }
  const storageCart = JSON.parse(localStorage.getItem("listProductCart") || "");

  // const cart = useSelector(
  //   (state: RootState) => state.reducer.cartSlice.listProductCart
  // );
  useEffect(() => {
    dispatch(handleProductsFetchRequest());
    dispatch(handleGetCategories());
    dispatch(handleLoginRequest());
    dispatch(handleGetReview());
    dispatch(handleGetPucharse());
    dispatch(handleGetDataLocalStorage(storageCart === "" ? [] : storageCart));
  }, []);
  return (
    <div>
      <div className="headerTab">
        <HeaderTab />
      </div>
      <Routes>
        <Route path="/E-Commerce" element={<Home />} />
        <Route path="/E-Commerce/pucharse" element={<Pucharse />} />
        <Route path="/E-Commerce/shop" element={<Shop />} />
        <Route path="/E-Commerce/cart" element={<Cart />} />
        <Route path="/E-Commerce/checkout" element={<Checkout />} />
        <Route path="/E-Commerce/product/:id" element={<DetailProduct />} />
        <Route
          path="/E-Commerce/category/:categoryName"
          element={<CategoryProduct />}
        />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
