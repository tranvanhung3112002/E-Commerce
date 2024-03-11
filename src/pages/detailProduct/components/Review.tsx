import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Rating,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/Redux/Store/store";
// import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
// import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { handlePostReview } from "../../../features/Redux/Reducers/reviewSlice";
import { nanoid } from "@reduxjs/toolkit";
import { handlegetOpenLogin } from "../../../features/Redux/Reducers/loginSlice";
import { IPucharse } from "../../../types/Models";
import { toast } from "react-toastify";
import PaginationComponent from "../../../components/pagination/PaginationComponent";
interface IReviewProps {
  idProduct: string;
}
const Review = ({ idProduct }: IReviewProps) => {
  const [dataReview, setDataReview] = useState<any>([]);
  const [dataReviewPage, setDataReviewPage] = useState<any>([]);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const listReview = useSelector(
    (state: RootState) => state.reducer.reviewSlice.listReview
  );
  const dataUsers = useSelector(
    (state: RootState) => state.reducer.loginSlice.listUsers
  );
  const userLogin = useSelector(
    (state: RootState) => state.reducer.loginSlice.user
  );
  console.log(userLogin);
  const listPucharseByUser: IPucharse[] = useSelector(
    (state: RootState) => state.reducer.pucharseSlice.pucharseByUser
  );
  let arr: any = [];

  listPucharseByUser.forEach((data) => {
    data.productsOrder.forEach((item) => arr.push(item.productId));
  });

  // console.log(arr);
  useEffect(() => {
    if (userLogin.id !== "" && rating) {
      handleClickReview;
    }
  }, [userLogin]);
  useEffect(() => {
    const listReviewProduct =
      listReview &&
      listReview?.filter((review) => review.productId === idProduct);

    const listReviewProductMerged = listReviewProduct.map((review) => {
      let mergedReview;
      dataUsers.forEach((user: any) => {
        if (user.id === review.userId) {
          mergedReview = { ...review, ...user };
        }
      });
      return mergedReview;
    });
    setDataReview(listReviewProductMerged);
  }, [listReview]);
  const handleRating = (event: any, newValue: any) => {
    console.log(event);

    setError("");
    setRating(newValue);
  };
  const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleClickReview = (e: any) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Rating is required");
    } else {
      if (userLogin.id !== undefined && userLogin.id !== "") {
        if (arr.includes(idProduct)) {
          const data = {
            id: nanoid(),
            userId: userLogin.id,
            productId: idProduct,
            rating: rating * 1,
            date: getDay(),
            comment: comment,
          };
          dispatch(handlePostReview(data));
          setComment("");
          setRating(0);
        } else {
          toast.error("You have not purchased the product yet", {
            theme: "colored",
            icon: false,
          });
          return;
        }
      } else {
        dispatch(handlegetOpenLogin());
      }
    }
  };
  // pagination review
  const handleNewListPage = (value: any) => {
    setDataReviewPage(value);
  };
  return (
    <Box sx={{ margin: "64px" }}>
      <Typography variant="h5">Reviews</Typography>

      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Typography variant="h2" textAlign={"center"}>
            {(
              dataReview?.reduce((acc: number, item: any) => {
                return acc + item?.rating;
              }, 0) / dataReview.length || 0
            ).toFixed(1)}
          </Typography>
          <Stack
            spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ marginBottom: "64px" }}
          >
            <Rating
              name="size-large"
              readOnly
              value={
                dataReview?.reduce((acc: number, item: any) => {
                  return acc + item?.rating;
                }, 0) / dataReview.length
              }
              size="large"
            />
          </Stack>

          {dataReviewPage.map((data: any) => (
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "16px",
              }}
              key={data?.userId}
            >
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6">{data?.username}</Typography>
                </Grid>
                <Grid item>{data?.date}</Grid>
              </Grid>
              <Stack spacing={1} sx={{ paddingY: "16px" }}>
                <Rating
                  name="size-large"
                  defaultValue={data?.rating}
                  size="small"
                />
              </Stack>
              <Typography>{data?.comment}</Typography>
            </Box>
          ))}

          <PaginationComponent
            arr={dataReview}
            quantityPage={3}
            handleNewListPage={handleNewListPage}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item alignItems={"center"}>
                <Typography>Your rating :</Typography>
              </Grid>
              <Grid item>
                <Stack spacing={1}>
                  <Rating
                    aria-required
                    name="size-large"
                    // defaultValue={0}
                    value={rating}
                    onChange={handleRating}
                    size="small"
                  />
                </Stack>
                {error !== "" && <div className="text-danger">{error}</div>}
              </Grid>
            </Grid>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel sx={{ paddingY: "8px" }}>Your review:</FormLabel>
              <TextareaAutosize
                minRows={8}
                value={comment}
                onChange={handleComment}
                style={{
                  padding: "10px",
                  borderColor: "#ccc",
                  width: "100%",
                  outline: "none",
                }}
              />
            </FormControl>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button
                  sx={{ marginTop: "16px" }}
                  variant="contained"
                  onClick={handleClickReview}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Review;

export const getDay = () => {
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();

  return `${year}-${month}-${day}`;
};
