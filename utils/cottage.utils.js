import custimAxios from "@/config/axios.config";
import { safeLocalStorage } from "./safeLocalstorge";

export const cottageUtils = {
  getCottage: async () => {
    const { data } = await custimAxios.get("/cottage", {
      headers: {
        "accept-language": safeLocalStorage.getItem("language"),
      },
    });
    return data;
  },
  getCottageByPlace: async (placeId) => {
    const { data } = await custimAxios.get(`/cottage/place/${placeId}`, {
      headers: {
        "accept-language": safeLocalStorage.getItem("language"),
      },
    });
    return data;
  },
  getCottageTop: async () => {
    const { data } = await custimAxios.get("/cottage/top", {
      headers: {
        "accept-language": safeLocalStorage.getItem("language"),
      },
    });
    return data;
  },
  getCottageType: async (type) => {
    const { data } = await custimAxios.get(`/cottage/cottage-type/${type}`, {
      headers: {
        "accept-language": safeLocalStorage.getItem("language"),
      },
    });
    return data;
  },
  getCottageUser: async () => {
    const { data } = await custimAxios.get("cottage/user", {
      headers: {
        "accept-language": safeLocalStorage.getItem("language"),
        Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
      },
    });
    return data;
  },
  getCottageUserId: async (userId) => {
    const { data } = await custimAxios.get(`cottage/user/${userId}`, {
      headers: {
        "accept-language": safeLocalStorage.getItem("language"),
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
          "accept-language": safeLocalStorage.getItem("language"),
        },
      }
    );
    return data;
  },
  getCottageTariffTop: async (id) => {
    const { data } = await custimAxios.get(`cottage/suitable/${id}`, {
      headers: {
        "accept-language": safeLocalStorage.getItem("language"),
      },
    });
    return data;
  },
  getCottageRecommended: async () => {
    const { data } = await custimAxios.get("cottage/recommended", {
      headers: {
        "accept-language": safeLocalStorage.getItem("language"),
      },
    });
    return data;
  },
  getSuitableCottage: async (id) => {
    const {data} = await custimAxios.get(`cottage/suitable/${id}`, {
      headers: {
        "accept-language": safeLocalStorage.getItem("language"),
      },
    })
    return data;
  },
  getSearchCottage: async ({search})=>{
    const {data} = await custimAxios.get(`cottage/search?name=${search}`, {
      headers: {
        "accept-language": safeLocalStorage.getItem("language"),
      },
    })
    return data
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
          Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  addCottageImage: async ({ cottageId, image, isMainImage }) => {
    const formData = new FormData();
    formData.append("cottageId", cottageId);
    formData.append("image", image);
    formData.append("isMainImage", isMainImage);
    const { data } = await custimAxios.post("cottage/image/add", formData, {
      headers:{
        Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
    }
    });
    return data;
  },
  orderActivePre: async ({cottageId, expireDays, priority, serviceCode}) => {
    const {data} = await custimAxios.post(`cottage/add/premium/${cottageId}`, {
        expireDays,
        priority,
        serviceCode
    },{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
    }) 
    return data
  },
  patchCottageText: async ({
    id,
    comforts,
    cottageStatus,
    cottageType,
    description,
    name,
    price,
    priceWeekend,
    rating,
    status,
    lattitude,
    longitude,
    placeId,
    regionId,
    isTop
  }) => {
    const { data } = await custimAxios.patch(`/cottage/edit/${id}`, {
      comforts: comforts,
      cottageStatus: cottageStatus,
      cottageType: cottageType,
      description: description,
      name: name,
      price: price,
      priceWeekend: priceWeekend,
      status: status,
      lattitude: lattitude,
      longitude: longitude,
      isTop: isTop,
      placeId: placeId,
      regionId: regionId,
      rating: rating
    }, {headers:{
      Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
  }});
    return data;
  },

  patchCottageImage: async ({ id, image }) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("status", "active");

    const { data } = await custimAxios.patch(
      `/cottage/image/edit/${id}`,
      formData, {
        headers:{
          Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
      }
      }
    );
    return data;
  },
  deleteCottageAll: async (id) => {
    const { data } = await custimAxios.delete(`/cottage/delete/${id}`, {
      headers:{
        Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
    }
    });
    return data;
  },
  deleteCottageImage: async (id) => {
    const { data } = await custimAxios.delete(`/cottage/image/delete/${id}`, {
      headers:{
        Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
    }
    });
    return data;
  },
};
