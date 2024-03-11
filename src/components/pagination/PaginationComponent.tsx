import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { useEffect, useMemo, useState } from "react";
import { IProduct } from "../../types/Models";

interface IPagination {
  arr: any[];
  quantityPage: number;
  handleNewListPage: (value: IProduct[]) => void;
}
const PaginationComponent = ({
  arr,
  quantityPage,
  handleNewListPage,
}: IPagination) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const newPageNumber = useMemo(
    () => Math.ceil(arr.length / quantityPage),
    [arr, quantityPage]
  );
  useEffect(() => {
    if (currentPage > pageNumber) {
      setCurrentPage(1);
    }
  }, [pageNumber]);
  useEffect(() => {
    setPageNumber(newPageNumber);
    const startIndex = (currentPage - 1) * quantityPage;
    const endIndex = startIndex + quantityPage;
    const newList = arr.slice(startIndex, endIndex);
    handleNewListPage(newList);
  }, [arr, currentPage, quantityPage]);

  const handleCurrentPage = (event: any, currentPage: number) => {
    console.log(event);

    setCurrentPage(currentPage);
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {" "}
      {pageNumber > 1 && (
        <Box>
          <Pagination
            count={pageNumber}
            shape="rounded"
            color="primary"
            page={currentPage}
            onChange={handleCurrentPage}
            sx={{ display: "flex", justifyContent: "center" }}
          />
        </Box>
      )}
    </div>
  );
};

export default PaginationComponent;
