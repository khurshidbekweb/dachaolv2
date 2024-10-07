import custimAxios from "@/config/axios.config";

export const OrderUtils = {
    getOrder: async () => {
        const {data} = await custimAxios.get('order/all/for/user', {
            headers: {
                "accept-language": localStorage.getItem("language"),
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        return data
    },
    activeOrder: async ({cottageId, tariffId}) => {
        const {data} = await custimAxios.post('order/add', {
            tariffId,
            cottageId
        },
    {
        headers:{
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
    })
        return data
    },
    editOrder: async ({orderId, orderStatus, status}) => {
    const {data} = await custimAxios.patch(`order/update/${orderId}`, {
        orderId,
        status,
        orderStatus
    }, 
    {
    headers: {
        "accept-language": localStorage.getItem("language"),
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    })
    return data
    },
}