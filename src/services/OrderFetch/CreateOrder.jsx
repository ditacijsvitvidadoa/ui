import {fetchdata} from "../fetchdata.js";

export default async function CreateOrder(formData) {
    try {
        const response = fetchdata("/api/add-order", {
            method: "PUT",
            body: formData,
        });

        return (await response).status;
    } catch (error) {
        console.error("Error creating order:", error);
        return null;
    }
}