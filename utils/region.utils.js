import custimAxios from "@/config/axios.config";
import { safeLocalStorage } from "./safeLocalstorge";

export const regionUtils = {
  getRegion: async () => {
    const { data } = await custimAxios.get("region", {
      headers: {
        "accept-language": safeLocalStorage.getItem("language"),
      },
    });
    return data;
  },
};
