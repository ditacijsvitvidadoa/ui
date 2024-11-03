import {fetchdata} from "../fetchdata.js";


export default async function GetCartProducts() {
    try {
        const response = await fetchdata(`/api/get-cart-products`, {
            method: 'GET',
        });

        return response.data
    } catch (error) {
        console.error("Error in GetCartProducts:", error.message || error);
    }
}