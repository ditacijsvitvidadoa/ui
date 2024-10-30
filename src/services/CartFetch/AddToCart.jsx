import {fetchdata} from "../fetchdata.js";

export default async function AddToCart(id, size) {
    try {
        const response = await fetchdata(`/api/add-product-to-cart/${id}?size=${size}`, {
            method: 'PUT',
        });
    } catch (error) {
        console.error("Error in AddToFavourite:", error.message || error);
    }
}