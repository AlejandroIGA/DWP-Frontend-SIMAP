import api from './apiDashboard'

const profileService = {
    get: async (id) => {
        try {
            const response = await api.get("/profile", { params: id });
            console.log("Response GET /profile", response.data)
            return response.data;
        } catch (error) {
            console.log("Error GET /profile", error)
            if (error.response) {
                return error.response.data;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
    update: async (name, phone, city, country, email, id) => {
        try {
            const response = await api.put("/profile", { name, phone, city, country, email, id });
            console.log("Response UPDATE /profile", response.msg)
            return response.data;
        } catch (error) {
            console.log("ERROR UPDATE /profile", error);
            if (error.response) {
                return error.response.data;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    }
}

export default profileService;