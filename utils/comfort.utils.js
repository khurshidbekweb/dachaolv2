import custimAxios from "@/config/axios.config";
import { safeLocalStorage } from "./safeLocalstorge";


export const comfortUtils = {
  getComfort: async () => {
    const { data } = await custimAxios.get("comfort", {
      headers: {
        "accept-language": safeLocalStorage.getItem("language") || "uz",
      },
    });
    return data;
  },
};
