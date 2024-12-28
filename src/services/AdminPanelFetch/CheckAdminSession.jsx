import {fetchdata} from "../fetchdata.js";


const CheckAdminSession = async () => {
    const { status } = await fetchdata('/api/check-admin-auth');
    console.log(status)
    return status === 200;
};

export default CheckAdminSession;