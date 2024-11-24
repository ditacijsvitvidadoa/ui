import {fetchdata} from "../fetchdata.js";


export default async function SendSupportFetch(formData) {
    try {
        const response = await fetchdata(`/api/send-to-support`, {
            method: 'POST',
            body: formData,
        });

    } catch (error) {
        console.error("Error in SendSupportFetch:", error.message || error);
    }
}

