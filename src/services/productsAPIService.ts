import request from "../utils/ConfigAPI";

export const getProductsAPI = async () => {
  try {
    const response = await request.get("products");

    return response;
  } catch (error) {
    throw error;
  }
};
