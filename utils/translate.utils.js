import custimAxios from "@/config/axios.config";
import {safeLocalStorage} from './safeLocalstorge'

export const translateUtils = {
  getTranslate: async () => {
    const { data } = await custimAxios.get("translate", {
      headers: {
        Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
      },
    });
    return data;
  },
  getUnusedTranslates: async () => {
    const { data } = await custimAxios.get("translate/unused", {
      headers: {
        Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
      },
    });
    return data;
  },
  getTranslateId: async (id) => {
    const { data } = custimAxios.get(`translate/${id}`, {
      headers: {
        Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
      },
    });
    return data;
  },
};
