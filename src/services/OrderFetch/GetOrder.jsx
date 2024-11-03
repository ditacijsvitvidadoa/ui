import {fetchdata} from "../fetchdata.js";


export default async function GetOrder() {
    const response = fetchdata("/api/get-orders")

    if ((await response).status === 200) {
        return (await response).data
    }

    return null
}