import {fetchdata} from "../fetchdata.js";


export default async function AddToFavourite(id) {
    try {
        const response = await fetchdata(`/api/add-favourite-product/${id}`, {
            method: 'PUT',
        });
    } catch (error) {
        console.error("Error in AddToFavourite:", error.message || error);
    }
}