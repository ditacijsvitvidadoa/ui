export const fetchdata = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`http://localhost:8000${endpoint}`, {
            ...options,
            credentials: 'include',
        });
        console.log("Fetchdata response status:", response.status);
        if (!response.ok) {
            return response;
        }
        const data = await response.json();
        console.log("Fetchdata response data:", data);
        return { data, status: response.status };
    } catch (error) {
        console.error("There was a problem with the request:", error.message || error);
        throw error;
    }
};