import custimAxios from "@/config/axios.config";

export const cottageUtils = {
  getCottage: async () => {
    const { data } = await custimAxios.get("/cottage", {
      headers: {
        "accept-language": localStorage.getItem("language"),
      },
    });
    return data;
  },
  getCottageByPlace: async (placeId) => {
    const { data } = await custimAxios.get(`/cottage/place/${placeId}`, {
      headers: {
        "accept-language": localStorage.getItem("language"),
      },
    });
    return data;
  },
  getCottageTop: async () => {
    const { data } = await custimAxios.get("/cottage/top", {
      headers: {
        "accept-language": localStorage.getItem("language"),
      },
    });
    return data;
  },
  getCottageType: async (type) => {
    const { data } = await custimAxios.get(`/cottage/cottage-type/${type}`, {
      headers: {
        "accept-language": localStorage.getItem("language"),
      },
    });
    return data;
  },
  getCottageUser: async () => {
    const { data } = await custimAxios.get("cottage/user", {
      headers: {
        "accept-language": localStorage.getItem("language"),
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data;
  },
  getCottageUserId: async (userId) => {
    const { data } = await custimAxios.get(`cottage/user/${userId}`, {
      headers: {
        "accept-language": localStorage.getItem("language"),
      },
    });
    return data;
  },
  getCottageFilter: async ({ type, place, price }) => {
    let queryStr = [];

    if (type) {
      queryStr.push(`type=${type}`);
    }

    if (place) {
      queryStr.push(`place=${place}`);
    }

    if (price) {
      queryStr.push(`price=${price}`);
    }

    const { data } = await custimAxios.get(
      `/cottage/filter/?${queryStr.join("&")}`,
      {
        type: type,
        place: place,
        price: price,

        headers: {
          "accept-language": localStorage.getItem("language"),
        },
      }
    );
    return data;
  },
  getCottageTariffTop: async (id) => {
    const { data } = await custimAxios.get(`cottage/suitable/${id}`, {
      headers: {
        "accept-language": localStorage.getItem("language"),
      },
    });
    return data;
  },
  getCottageRecommended: async () => {
    const { data } = await custimAxios.get("cottage/recommended", {
      headers: {
        "accept-language": localStorage.getItem("language"),
      },
    });
    return data;
  },
  postCottage: async ({
    comforts,
    cottageType,
    description,
    mainImage,
    images,
    name,
    placeId,
    price,
    priceWeekend,
    regionId,
  }) => {
    try {
      const formData = new FormData();
      comforts.forEach((el) => formData.append("comforts", el));
      cottageType.forEach((el) => formData.append("cottageType", el));
      images.forEach((img) => formData.append("images", img));
      formData.append("name", name);
      formData.append("mainImage", mainImage);
      formData.append("placeId", placeId);
      formData.append("regionId", regionId);
      formData.append("price", price);
      formData.append("priceWeekend", priceWeekend);
      formData.append("description", description);
      const { data } = await custimAxios.post("cottage/add", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
