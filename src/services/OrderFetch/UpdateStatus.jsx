import {fetchdata} from "../fetchdata.js";


export default async function UpdateStatus(orderId, status) {
    try {
        const response = fetchdata(`/api/change-order-status/${orderId}?status=${status}`, {
            method: "PUT",
        });

        return (await response).status;
    } catch (error) {
        console.error("Error creating order:", error);
        return null;
    }
}