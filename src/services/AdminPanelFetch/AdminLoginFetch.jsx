import {fetchdata} from "../fetchdata.js";


export default async function AdminLoginFetch(formData) {
    try {
        const response = await fetchdata(`/api/login-admin-panel`, {
            method: 'POST',
            body: formData,
        });

        return (await response)
    } catch (error) {
        console.error("Error in AccountInfoFetch:", error.message || error);
    }
}