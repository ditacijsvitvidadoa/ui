export const fetchdata = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`https://dutyachijsvit.com.ua/${endpoint}`, {
            ...options,
            credentials: 'include',
        });

        if (response.status === 204) {
            return { data: null, status: response.status };
        }

        const isJson = response.headers.get("content-type")?.includes("application/json");
        const data = isJson ? await response.json() : null;

        return { data, status: response.status };
    } catch (error) {
        console.error("There was a problem with the request:", error.message || error);
        throw error;
    }
};
