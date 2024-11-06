import {fetchdata} from "../fetchdata.js";


export default async function CreateProductFetch(formData){
    try {
        const response = fetchdata("/api/create-product", {
            method: "POST",
            body: formData,
        });

        return (await response).status
    } catch (e) {
        console.error("Error creating product", e)
        return null
    }
}