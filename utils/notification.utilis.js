import custimAxios from "@/config/axios.config";

export const notificationUtils = {
  getNotification: async () => {
    const { data } = await custimAxios.get("/notification/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data;
  },
  getUserNotification: async (id) => {
    if (!id) return null;
    const data = [];
    data.push(...(await custimAxios.get(`/notification/by/${id}`)).data);
    return data;
  },
  patchNatification: async ({ id, watchedUserId, status }) => {
    const { data } = await custimAxios.patch(
      `/notification/update/${id}`,
      {
        watchedUserId: watchedUserId,
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return data;
  },
};
