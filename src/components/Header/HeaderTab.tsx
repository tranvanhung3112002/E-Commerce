import { NavLink, useNavigate } from "react-router-dom";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaBars, FaRegUser, FaSearch, FaShoppingBag } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import "react-slideshow-image/dist/styles.css";
import "../../index.css";
import { Box, Drawer } from "@mui/material";
import { useState } from "react";
import Search from "./component/search";

import { RootState } from "../../features/Redux/Store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLogout,
  handlegetCloseLogin,
  handlegetOpenLogin,
} from "../../features/Redux/Reducers/loginSlice";
import Login from "../../pages/login";
import styles from "../Header/Header.module.css";
import { IoClose } from "react-icons/io5";
const HeaderTab = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statusDrawerLogin = useSelector(
    (state: RootState) => state.reducer.loginSlice.open
  );
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(open);
    };
  const userInfo = useSelector(
    (state: RootState) => state.reducer.loginSlice.user
  );
  return (
    <header
      className="navbar nav-link "
      style={{ background: "#ff99cc", zIndex: "20" }}
    >
      <label htmlFor="mb-input" className="checkbtn">
        <FaBars />
      </label>
      <input type="checkbox" hidden className="mb-input" id="mb-input" />
      <label htmlFor="mb-input" className="overlay"></label>
      <div className="reponsive-mb" style={{ zIndex: "1" }}>
        <Box>
          <label htmlFor="mb-input" className="closes">
            <IoClose />
          </label>
        </Box>
        <br />
        <hr />
        <div className="repomsive-mb-list">
          <div>
            <NavLink
              to="E-Commerce/"
              className="mbb nav-link"
              aria-current="page"
            >
              Home
            </NavLink>
          </div>

          <div>
            <NavLink to="E-Commerce/shop" className="mbb nav-link">
              Shop
            </NavLink>
          </div>

          <div>
            <NavLink to="E-Commerce/about" className="mbb nav-link ">
              About Us
            </NavLink>
          </div>
          <div>
            <NavLink to="E-Commerce/contact" className="mbb nav-link">
              Contact
            </NavLink>
          </div>
          <div>
            <NavLink to="E-Commerce/blog" className="mbb nav-link">
              Blog
            </NavLink>
          </div>
        </div>
      </div>

      <div className="container">
        <Box className="logo">
          <NavLink to="/E-Commerce/">
            <img
              src="https://woodmart.xtemos.com/kids/wp-content/uploads/sites/13/2023/05/w-bcs-logo-black-l-1.svg"
              alt=""
            />
          </NavLink>
        </Box>
        <div className="uppercase">
          <div>
            <div className="nav-underline position-absolute start-50 translate-middle">
              <div className="d-flex nav-underline">
                <div className="nav-item p-2 flex-fill ">
                  <NavLink
                    to="E-Commerce/"
                    className="nav-link"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </div>

                <div className="nav-item p-2 flex-fill">
                  <NavLink to="E-Commerce/shop" className="nav-link">
                    Shop
                  </NavLink>
                </div>

                <div className="nav-item p-2 flex-fill">
                  <NavLink to="E-Commerce/about" className="nav-link ">
                    About Us
                  </NavLink>
                </div>
                <div className="nav-item p-2 flex-fill">
                  <NavLink to="E-Commerce/contact" className="nav-link">
                    Contact
                  </NavLink>
                </div>
                <div className="nav-item p-2 flex-fill">
                  <NavLink to="E-Commerce/blog" className="nav-link">
                    Blog
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center position-absolute top-50 end-0 translate-middle-y">
            <div className="nav-item p-2 flex-fill">
              {userInfo.username === "" ? (
                <Tooltip title="My account">
                  <IconButton
                    aria-label="cart"
                    onClick={() => dispatch(handlegetOpenLogin())}
                  >
                    <FaRegUser />
                  </IconButton>
                </Tooltip>
              ) : (
                <span className={styles.headernavbaruser}>
                  {userInfo.username}
                  <ul className={styles.headernavbarusermenu}>
                    <li className={styles.headernavbaruseritem}>
                      <p onClick={() => navigate("E-Commerce/pucharse")}>
                        Purchase
                      </p>
                    </li>
                    <li className={styles.headernavbaruseritem}>
                      <p
                        onClick={() =>
                          dispatch(handleLogout(), navigate("E-Commerce/"))
                        }
                      >
                        Log out
                      </p>
                    </li>
                  </ul>
                </span>
              )}

              <div>
                <Drawer
                  anchor="right"
                  open={statusDrawerLogin}
                  onClose={() => dispatch(handlegetCloseLogin())}
                >
                  <Login />
                </Drawer>
              </div>
            </div>

            <div className="nav-item p-2 flex-fill">
              <Tooltip title="Search">
                <IconButton onClick={() => setIsOpen(true)}>
                  <FaSearch />
                </IconButton>
              </Tooltip>

              <Drawer
                anchor="bottom"
                open={isOpen}
                onClose={toggleDrawer(false)}
              >
                <Search onhandleOpen={setIsOpen} />
              </Drawer>
            </div>
            <div className="nav-item p-2 flex-fill">
              <Tooltip title="My withlist">
                <IconButton>
                  <IoIosHeartEmpty />
                  <span className="carousel"></span>
                </IconButton>
              </Tooltip>
            </div>

            <div className="nav-item p-2 flex-fill">
              <NavLink
                to="E-Commerce/cart"
                className="nav-link"
                style={{ fontSize: 25 }}
              >
                <Tooltip title="Shopping cart">
                  <IconButton>
                    <FaShoppingBag />
                    <span className="carousel"></span>
                  </IconButton>
                </Tooltip>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTab;
