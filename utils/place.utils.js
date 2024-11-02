import custimAxios from "@/config/axios.config";
import { safeLocalStorage } from "./safeLocalstorge";

export const placeUtils = {
  getPlace: async () => {
    const { data } = await custimAxios.get("place", {
      headers: {
        "accept-language": safeLocalStorage.getItem("language"),
      },
    });
    return data;
  },
  getPlaceById: async (id) => {
    const { data } = await custimAxios.get(`place/by/region/${id}`, {
      headers: {
        "accept-language": safeLocalStorage.getItem("language"),
      },
    });
    return data;
  },
};
