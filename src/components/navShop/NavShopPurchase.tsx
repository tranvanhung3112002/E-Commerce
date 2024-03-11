import { Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "./NavShop.module.css";

const NavShopPurchase = () => {
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
          <NavLink to="/cart" className="nav-link" aria-current="page">
            PUCHARSE
          </NavLink>
        </div>
      </div>
    </Stack>
  );
};

export default NavShopPurchase;
