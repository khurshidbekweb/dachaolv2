import custimAxios from "@/config/axios.config";


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
