import {fetchdata} from "../fetchdata.js";


export default async function LogOutFetch() {
    try {
        const response = await fetchdata(`/api/logout`, {
            method: 'POST',
        });

        return (await response).status
    } catch (error) {
        console.error("Error in LogOutFetch:", error.message || error);
    }
}