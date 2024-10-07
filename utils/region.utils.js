import custimAxios from "@/config/axios.config";

export const regionUtils = {
  getRegion: async () => {
    const { data } = await custimAxios.get("region", {
      headers: {
        "accept-language": localStorage.getItem("language"),
      },
    });
    return data;
  },
};
