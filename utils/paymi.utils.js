import custimAxios from "@/config/axios.config";
import { safeLocalStorage } from "./safeLocalstorge";


export const paymiUtils = {
    orderPaymi: async ({orderId, url}) => {
        const {data}  = await custimAxios.post('payme/checkout', {
            orderId, 
            url
        }, {
            headers: {
                            "accept-language": safeLocalStorage.getItem("language"),
                            Authorization: `Bearer ${safeLocalStorage.getItem("accessToken")}`,
                        },
        })
        return data
    }
}