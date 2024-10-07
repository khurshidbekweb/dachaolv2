import custimAxios from "@/config/axios.config";

export const languageUtils = {
  getLanguage: async () => {
    const { data } = await custimAxios.get("language");
    return data;
  },
};
