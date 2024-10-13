import axios from "axios";
import { authUtils } from "../utils/auth.utils";
import { BASE_URL_SERVER } from "@/constants/server";

const custimAxios = axios.create({
  baseURL: BASE_URL_SERVER,
  timeout: 10000,
});


custimAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 406) {
      window.location.reload()
      authUtils.refreshAuth();
    }
    return Promise.reject(err);
  }
);

export default custimAxios;
