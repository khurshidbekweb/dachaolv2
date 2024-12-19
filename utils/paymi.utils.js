import custimAxios from "@/config/axios.config";


export const paymiUtils = {
    orderPaymi: async ({orderId, url}) => {
        const {data}  = await custimAxios.post('payme/checkout', {
            orderId, 
            url
        })
        return data
    }
}