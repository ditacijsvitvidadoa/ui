import {fetchdata} from "../fetchdata.js";


export default async function AccountInfoFetch(field, formData){
    try {
        const response = await fetchdata(`/api/account-update/${field}`, {
            method: 'POST',
            body: formData,
        });

        return (await response).status
    } catch (error) {
        console.error("Error in AccountInfoFetch:", error.message || error);
    }
}