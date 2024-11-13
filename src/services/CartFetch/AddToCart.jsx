import {fetchdata} from "../fetchdata.js";

export default async function AddToCart(id, size = "", color = "") {
    try {
        const encodedColor = encodeURIComponent(color);

        const response = await fetchdata(`/api/add-product-to-cart/${id}?size=${size}&color=${encodedColor}`, {
            method: 'PUT',
        });
    } catch (error) {
        console.error("Error in AddToCart:", error.message || error);
    }
}
