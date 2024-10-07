import custimAxios from "@/config/axios.config";

export const placeUtils = {
  getPlace: async () => {
    const { data } = await custimAxios.get("place", {
      headers: {
        "accept-language": localStorage.getItem("language"),
      },
    });
    return data;
  },
};
