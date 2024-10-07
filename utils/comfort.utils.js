import custimAxios from "../configs/axios.config";

export const comfortUtils = {
  getComfort: async () => {
    const { data } = await custimAxios.get("comfort", {
      headers: {
        "accept-language": localStorage.getItem("language") || "uz",
      },
    });
    return data;
  },
};
