import custimAxios from "../configs/axios.config";

export const translateUtils = {
  getTranslate: async () => {
    const { data } = await custimAxios.get("translate", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data;
  },
  getUnusedTranslates: async () => {
    const { data } = await custimAxios.get("translate/unused", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data;
  },
  getTranslateId: async (id) => {
    const { data } = custimAxios.get(`translate/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data;
  },
};
