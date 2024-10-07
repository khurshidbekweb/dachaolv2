import custimAxios from "@/config/axios.config";

export const ServiceUtils = {
  getService: async () => {
    const { data } = await custimAxios.get("/services", {
      headers: {
        "accept-language": localStorage.getItem("language"),
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data;
  },
  getServiceId: async (id) => {
    const {data} = await custimAxios.get(`services/${id}`, {
      headers: {
        "accept-language": localStorage.getItem("language"),
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    return data
  }
};
