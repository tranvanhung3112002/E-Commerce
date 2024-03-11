import { Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "./NavShop.module.css";

const NavShop = () => {
  const handleClick = (e: any) => {
    e.preventDefault();
  };
  return (
    <Stack
      className={styles.title}
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <div className="d-flex nav-underline">
        <div className="nav-item p-2 flex-fill ">
          <NavLink
            to="/cart"
            onClick={handleClick}
            className="nav-link"
            aria-current="page"
          >
            SHOPPING CART
          </NavLink>
        </div>
        <div className="mt-2">
          <i className="fa-solid fa-arrow-right"></i>
        </div>
        <div className="nav-item p-2 flex-fill ">
          <NavLink to="/checkout" onClick={handleClick} className="nav-link ">
            CHECKOUT
          </NavLink>
        </div>
        <div className="mt-2">
          <i className="fa-solid fa-arrow-right"></i>
        </div>
        <div className="nav-item p-2 flex-fill">ORDER COMPLETE</div>
      </div>
    </Stack>
  );
};

export default NavShop;
