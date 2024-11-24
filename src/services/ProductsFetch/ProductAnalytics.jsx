import {fetchdata} from "../fetchdata.js";


export default async function ProductAnalyticsFetch(productId, field, increment) {
    try {
        const formData = new FormData();
        formData.append("product_id", productId);
        formData.append("field", field);
        formData.append("increment", increment);

        const response = await fetchdata("/api/update-product-analytics", {
            method: "PUT",
            body: formData,
        });

        return response.status;
    } catch (e) {
        console.error("Error updating product analytics", e);
        return null;
    }
}
