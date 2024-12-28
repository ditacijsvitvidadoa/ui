import {fetchdata} from "../../fetchdata.js";


export default async function DeleteFromFavourite(id) {
    try {
        const response = await fetchdata(`/api/delete-favourite-product/${id}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error("Error in DeleteFromFavourite:", error.message || error);
    }
}