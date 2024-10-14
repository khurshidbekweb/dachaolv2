import custimAxios from "@/config/axios.config";
import { safeLocalStorage } from "./safeLocalstorge";

export const cottageTypeUtils = {
  getCottageType: async () => {
    const { data } = await custimAxios.get("/cottage-type", {
      headers: {
        "accept-language": safeLocalStorage.getItem("language"),
      },
    });
    return data;
  },
};
