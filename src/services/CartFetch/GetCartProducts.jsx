import {fetchdata} from "../fetchdata.js";
export default async function GetCartProducts() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const body = JSON.stringify({
            cart: cart
        });

        const response = await fetchdata(`/api/get-cart-products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        });

        return response.data;
    } catch (error) {
        console.error("Error in GetCartProducts:", error.message || error);
    }
}