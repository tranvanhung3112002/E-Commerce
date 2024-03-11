import { Fragment } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import ImageDialogComponent from "./dialogComponent/ImageDialogComponent";
import ContentDialogComponent from "./dialogComponent/ContentDialogComponent";

interface OpenProps {
  open: boolean;
  onHandleClose(open: boolean): void;
}

const DialogProductComponent = ({ open, onHandleClose }: OpenProps) => {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  return (
    <Fragment>
      <BootstrapDialog
        onClose={() => onHandleClose(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          sx: {
            maxWidth: "70%",
            maxHeight: "90%",
            borderRadius: "10px",
            cursor: "pointer",
          },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={() => onHandleClose(false)}
          sx={{
            position: "absolute",
            right: 15,
            top: 5,
            color: (theme) => theme.palette.grey[500],
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers className="row d-lg-flex pt-4 px-0 mx-1">
          <Box
            className="col-12 col-lg-6 "
            display="flex"
            sx={{ height: "60%" }}
          >
            <ImageDialogComponent />
          </Box>
          <Box className="col-12 col-lg-6" alignContent="center">
            <ContentDialogComponent />
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </Fragment>
  );
};

export default DialogProductComponent;
