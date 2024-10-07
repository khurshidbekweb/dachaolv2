import custimAxios from "../configs/axios.config";

export const languageUtils = {
  getLanguage: async () => {
    const { data } = await custimAxios.get("language");
    return data;
  },
};
