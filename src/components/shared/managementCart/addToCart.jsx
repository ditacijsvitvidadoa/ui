import { fetchdata } from "../../../services/fetchdata.js";

export async function addToCart(productId) {
    try {
        const response = await fetchdata(`/api/add-product-to-cart/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 200) {
            const data = await response.data;
            console.log("Product added to cart:", data);
            return data;
        } else {
            console.error(`Failed to add product to cart: Status ${response.status}`);
        }
    } catch (error) {
        console.error("Error adding product to cart:", error.message);
    }
}

