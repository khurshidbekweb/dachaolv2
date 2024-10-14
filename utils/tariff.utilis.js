import custimAxios from "@/config/axios.config";
import { safeLocalStorage } from "./safeLocalstorge";

export const TariffUtils = {
  getTariff: async () => {
    const { data } = await custimAxios.get("/tariff", {
      headers: {
        "accept-language": safeLocalStorage.getItem("language"),
        Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
      },
    });
    return data;
  },
};
