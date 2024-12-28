import {fetchdata} from "../../fetchdata.js";

export default async function DeleteFromCart(id) {
    try {
        const response = await fetchdata(`/api/delete-cart-product/${id}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error("Error in DeleteFromCart:", error.message || error);
    }
}