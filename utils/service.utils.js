import custimAxios from "@/config/axios.config";
import { safeLocalStorage } from "./safeLocalstorge";

export const ServiceUtils = {
  getService: async () => {
    const { data } = await custimAxios.get("/services", {
      headers: {
        "accept-language": safeLocalStorage.getItem("language"),
        Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
      },
    });
    return data;
  },
  getServiceId: async (id) => {
    const {data} = await custimAxios.get(`services/${id}`, {
      headers: {
        "accept-language": safeLocalStorage.getItem("language"),
        Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
      },
    })
    return data
  }
};
