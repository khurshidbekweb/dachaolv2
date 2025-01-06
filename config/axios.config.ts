import axios from "axios";
import { authUtils } from "../utils/auth.utils";
import { BASE_URL_SERVER } from "@/constants/server";

const custimAxios = axios.create({
  baseURL: BASE_URL_SERVER,
  timeout: 50000,
});


custimAxios.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err?.response?.status === 406) {
      try {
        await authUtils.refreshAuth();
        window.location.reload(); // Refresh muvaffaqiyatli bo'lsa qayta yuklash
      } catch (refreshErr) {
        console.error("Auth refresh failed:", refreshErr);
      }
    }
    return Promise.reject(err);
  }
);


export default custimAxios;
