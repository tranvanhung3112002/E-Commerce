import request from "../utils/ConfigAPI";

const categoryApi = {
  getAllCategories: async () => {
    try {
      const url = "category";
      const res = await request.get(url);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default categoryApi;
