import { Chip } from '@mui/material';
interface stateProductProps {
    stateProduct:string[] ; 
}

const StateProductComponent = ({stateProduct} : stateProductProps ) => {
  return (
    <>
        {stateProduct.map(
                  (item, index) =>
                    item !== "popular" && (
                      <Chip
                        key={index}
                        label={item.charAt(0).toUpperCase() + item.slice(1)}
                        color={
                          item.includes("new")
                            ? "success"
                            : item.includes("hot")
                            ? "error"
                            : "default"
                        }
                        className="mb-1"
                        size="small"
                      />
                    )
                )}
    </>
  )
}

export default StateProductComponent