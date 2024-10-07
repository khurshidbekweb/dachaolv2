import custimAxios from "@/config/axios.config";

export const cottageTypeUtils = {
  getCottageType: async () => {
    const { data } = await custimAxios.get("/cottage-type", {
      headers: {
        "accept-language": localStorage.getItem("language"),
      },
    });
    return data;
  },
};
