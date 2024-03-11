import {
  Box,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemText,
  NativeSelect,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import ViewCompactTwoToneIcon from "@mui/icons-material/ViewCompactTwoTone";
import React, { useState } from "react";
import styles from "../shop.module.css";
import { useLocation } from "react-router-dom";

interface OptionViewProps {
  onhandleProductQuantity(value: number): void;
  onhandleProductLine(value: number): void;
  onSelectSort(value: string): void;
}
const OptionViewComponent = ({
  onhandleProductQuantity,
  onhandleProductLine,
  onSelectSort,
}: OptionViewProps) => {
  const [activeQuantity, setActiveQuantity] = useState<number>(9);
  const [activeIcon, setACtiveIcon] = useState<number>(4);
  const arrayQuantityProduct: number[] = [9, 12, 18, 24];
  const handleSelectSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectSort(event.target.value);
  };

  const location = useLocation();
  return (
    <Box>
      <Grid spacing={2} container className="d-flex justify-content-around">
        <Box className="d-flex px-2">
          <Grid item xs={12} display="flex" alignItems="center">
            <Typography component="span">
              Home{" "}
              <Typography component="strong" fontWeight="500">
                {location.pathname}
              </Typography>
            </Typography>
          </Grid>
        </Box>
        <Grid
          item
          xs={8}
          container
          display="flex"
          justifyContent="end"
          className="pb-3"
        >
          <Box className="d-md-flex justify-content-around d-none">
            <Grid
              item
              xs={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
              className="mx-3"
            >
              <Typography component="span" marginRight="5px">
                Show:
              </Typography>
              <List sx={{ display: "flex", cursor: "pointer" }}>
                {arrayQuantityProduct.map((item: number, index: number) => (
                  <ListItem
                    key={index}
                    sx={{ padding: "3px" }}
                    onClick={() => {
                      onhandleProductQuantity(item);
                      setActiveQuantity(item);
                    }}
                  >
                    <ListItemText
                      primary={item}
                      sx={{
                        color: activeQuantity === item ? "blue" : "",
                        borderRadius: "3px",
                      }}
                      className={styles.hoverOption}
                    />
                    <Typography>/</Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid
              item
              xs={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
              className="mx-3"
            >
              <List sx={{ display: "flex", cursor: "pointer" }}>
                <ListItem
                  sx={{
                    padding: "3px",
                    backgroundColor: activeIcon === 1 ? "yellow" : "",
                    borderRadius: "6px",
                  }}
                  onClick={() => {
                    onhandleProductLine(1);
                    setACtiveIcon(1);
                  }}
                  className={styles.hoverOption}
                >
                  <MenuIcon></MenuIcon>
                </ListItem>
                <ListItem
                  sx={{
                    padding: "3px",
                    backgroundColor: activeIcon === 2 ? "yellow" : "",
                    borderRadius: "6px",
                  }}
                  onClick={() => {
                    onhandleProductLine(2);
                    setACtiveIcon(2);
                  }}
                  className={`d-none d-xl-block ${styles.hoverOption}`}
                >
                  <GridViewIcon></GridViewIcon>
                </ListItem>
                <ListItem
                  sx={{
                    padding: "3px",
                    backgroundColor: activeIcon === 3 ? "yellow" : "",
                    borderRadius: "6px",
                  }}
                  onClick={() => {
                    onhandleProductLine(3);
                    setACtiveIcon(3);
                  }}
                  className={`d-none d-xl-block ${styles.hoverOption}`}
                >
                  <ViewCompactIcon></ViewCompactIcon>
                </ListItem>
                <ListItem
                  sx={{
                    padding: "3px",
                    backgroundColor: activeIcon === 4 ? "yellow" : "",
                    borderRadius: "6px",
                  }}
                  onClick={() => {
                    onhandleProductLine(4);
                    setACtiveIcon(4);
                  }}
                  className={styles.hoverOption}
                >
                  <ViewCompactTwoToneIcon />
                </ListItem>
              </List>
            </Grid>
          </Box>
          <Box className="d-flex justify-content-between">
            <Grid
              item
              xs={12}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FormControl fullWidth>
                <NativeSelect
                  defaultValue={1}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                    sx:{
                      padding:'0px'
                    }
                  }}
                  onChange={handleSelectSort}
                  
                >
                  <option value={1}>Default sorting</option>
                  <option value={2}>Sort by price:low to high</option>
                  <option value={3}>Sort by price:high to low</option>
                  <option value={4}>Sort by average rating</option>
                  <option value={5}>Sort by hot</option>
                </NativeSelect>
              </FormControl>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OptionViewComponent;
