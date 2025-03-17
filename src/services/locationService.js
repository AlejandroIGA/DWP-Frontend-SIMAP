/*
API: https://countrystatecity.in/
*/
API_LOCATION_URL = "https://api.countrystatecity.in/v1/";

API_KEY = "";

const api = axios.create({
    baseURL: API_LOCATION_URL,
    headers: {
        "X-CSCAPI-KEY": "API_KEY"
    },
    withCredentials: false
});

const locationService = {
    get: async (country) => {
        try {
            const response = api.get(`${country}/states`);
            console.log("Response GET/country/states", response.data);
            return response.data;
        } catch (error) {
            console.log("ERROR GET/contry/states", error);
            return [];
        }
    }
}

export default locationService;