import custimAxios from "../configs/axios.config";

export const userUtils = {
  getUsers: async () => {
    const { data } = await custimAxios.get("user/all");
    return data;
  },
  getSingleUser: async () => {
    if (!localStorage.getItem("accessToken")) return null;
    const { data } = await custimAxios.get("/user/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  },
  getCottageUserById: async (userId) => {
    const { data } = await custimAxios.get(`/user/single/user/by/${userId}`);
    return data;
  },
  getUserDevice: async (userId) => {
    const { data } = await custimAxios.get(`user/user-device/${userId}`);
    return data;
  },
  editUser: async ({ id, phone, email, name, image }) => {
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("name", name);
    formData.append("image", image);

    // User fovarite cottage oldin bor edi

    // favoriteCottages.forEach((cottage) =>
    //   formData.append("favoriteCottages", cottage)
    // );
    const { data } = await custimAxios.patch(`user/edit/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data;
  },
};
