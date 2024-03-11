import { FaPinterest } from "react-icons/fa";
import { FaLinkedinIn, FaTelegram } from "react-icons/fa6";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
// import Stack from "@mui/material/Stack";
import EmailIcon from "@mui/icons-material/Email";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import XIcon from "@mui/icons-material/X";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";
import "../Footer/Footer.module.css";
import styles from "../Footer/Footer.module.css";

const Footer = () => {
  return (
    <>
      <Box className={styles.Box}>
        <Grid container justifyContent="center" alignItems="center" pt={4}>
          <Grid item md={3} sm={12}>
            <img
              src="https://woodmart.xtemos.com/kids/wp-content/uploads/sites/13/2023/05/w-bcs-logo-black-l-1.svg"
              alt=""
            />
          </Grid>
          <Grid
            item
            md={3}
            sm={12}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={1}>
              <Grid className={styles.EmailIcon}>
                <EmailIcon />
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <h5 style={{ marginLeft: "20px" }}>
                Join our mailing list to receive any latest updates and
                promotions
              </h5>
            </Grid>
          </Grid>
          <Grid
            item
            md={3}
            container
            justifyContent="center"
            alignItems="center"
            sm={12}
          >
            <Grid item md={7}>
              <input
                className={styles.input}
                type="email"
                placeholder="  Your email address"
              />
            </Grid>
            <Grid item md={4}>
              <Button
                style={{ marginLeft: "10px" }}
                type="submit"
                variant="contained"
                className={styles.button}
              >
                Sign up
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item md={9}>
            <hr />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" pt={4}>
          <Grid item md={3} sm={12}>
            <h1 className={styles.h1}>Beautiful things for small people</h1>
            <Grid container spacing={2}>
              <Grid item>
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=https://woodmart.xtemos.com/kids/about-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookOutlinedIcon className={styles.fb} />
                </a>
              </Grid>
              <Grid item>
                <a
                  href="https://x.com/share?url=https://woodmart.xtemos.com/kids/about-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <XIcon fontSize="small" className={styles.xicon} />
                </a>
              </Grid>
              <Grid item>
                <a
                  href="https://pinterest.com/pin/create/button/?url=https://woodmart.xtemos.com/kids/about-us/&media=https://woodmart.xtemos.com/kids/wp-includes/images/media/default.png&description=About+us"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaPinterest className={styles.pin} />
                </a>
              </Grid>
              <Grid item>
                <a
                  href="https://www.linkedin.com/shareArticle?mini=true&url=https://woodmart.xtemos.com/kids/about-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn className={styles.linkedinIn} />
                </a>
              </Grid>
              <Grid item>
                <a
                  href="https://telegram.me/share/url?url=https://woodmart.xtemos.com/kids/about-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTelegram className={styles.telegram} />
                </a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={2} sm={6}>
            <h4>Shop</h4>
            <p>Growsuits</p>
            <p>Toys</p>
            <p>Accessories</p>
            <p>Dresses</p>
            <p>Leggings</p>
          </Grid>
          <Grid item md={2} sm={6}>
            <h4>Useful links</h4>
            <p>
              {" "}
              <NavLink to="/blog" className="nav-link">
                Blog
              </NavLink>
            </p>
            <p>
              {" "}
              <NavLink to="/contact" className="nav-link">
                Contact us
              </NavLink>
            </p>
            <p>
              <NavLink to="/about" className="nav-link ">
                About Us
              </NavLink>
            </p>
            <p>Delivery & Return</p>
          </Grid>
          <Grid item md={2} sm={12}>
            <h4> Got a question?</h4>
            <p>Email: babyclothes@mail.com</p>
            <p>Call Us: (064) 332-1233</p>
            <p>Monday - Friday</p> <p>Hours: 9:00am - 5:00pm</p>{" "}
            <p>913 Wyandotte St, Kansas City, MO 64105, United States</p>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Footer;
