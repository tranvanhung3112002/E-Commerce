import request from "../utils/ConfigAPI";

const loginAPI = {
  postLogin: async () => {
    try {
      const url = "users";
      const res = await request.get(url);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default loginAPI;
