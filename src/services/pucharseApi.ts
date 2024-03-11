import { IPucharse } from "../types/Models";
import request from "../utils/ConfigAPI";

const pucharseApi = {
  getAllPucharses: async () => {
    try {
      const url = "orders";
      const res = await request.get(url);
      return res;
    } catch (error) {
      throw error;
    }
  },
  postPurchase: async (data: IPucharse) => {
    try {
      const url = "orders";
      await request.post(url, data);
      const res = await request.get(url);
      console.log(res);

      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default pucharseApi;
