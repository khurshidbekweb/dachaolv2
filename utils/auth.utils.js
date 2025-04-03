import custimAxios from "@/config/axios.config";
import { safeLocalStorage } from "./safeLocalstorge";

export const authUtils = {
  loginAuth: async ({ smsCode, userId }) => {
    const { data } = await custimAxios.post("/auth/login", {
      smsCode,
      userAgent: window.navigator.userAgent,
      userId,
    });

    safeLocalStorage.setItem("accessToken", data?.accessToken);
    safeLocalStorage.setItem("refreshToken", data?.refreshToken);
    safeLocalStorage.setItem("user", JSON.stringify(data?.user));

    // rewrite axios token
    custimAxios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data?.accessToken}`;
    
    return data;x
  },

  smsAuth: async ({ phone, languageCode }) => {
    const { data } = await custimAxios.post("/auth/login/sms", { phone,languageCode });

    return data;
  },

  refreshAuth: async () => {
    const { data } = await custimAxios.post(
      "/auth/refresh",
      {
        userAgent: window.navigator.userAgent,
      },
      {
        headers: {
          refreshToken: safeLocalStorage.getItem("refreshToken"),
        },
      }
    );

    safeLocalStorage.setItem("accessToken", data?.accessToken);
    safeLocalStorage.setItem("refreshToken", data?.refreshToken);

    // rewrite axios token
    custimAxios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${safeLocalStorage.getItem("accessToken")}`;

    return data;
  },
};
