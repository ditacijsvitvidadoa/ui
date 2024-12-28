import {fetchdata} from "../fetchdata.js";


export default async function GetFavouritesProducts() {
    try {
        const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

        const body = JSON.stringify({
            favourites: favourites
        });

        const response = await fetchdata(`/api/get-favoutires-products`, {
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