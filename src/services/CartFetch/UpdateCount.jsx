import {fetchdata} from "../fetchdata.js";


export default async function UpdateCount(id, size, color, count) {
    try {
        const encodedColor = encodeURIComponent(color);

        await fetchdata(`/api/update-cart-product-count?id=${id}&size=${size}&color=${encodedColor}&count=${count}`, {
            method: 'PUT',
        });
    } catch (error) {
        console.error("Error in UpdateCount:", error.message || error);
    }
}