import api from './apiDashboard'

const profileService = {
    get: async (user_id) => {
        try {
            const response = await api.get(`/profile/${user_id}`,);
            return response;
        } catch (error) {
            if (error.response) {
                return error;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
    update: async (name, phone, city, country, email, user_id) => {
        try {
            const response = await api.put(`/profile/update/${user_id}`, { name, phone, city, country, email });
            return response;
        } catch (error) {
            if (error.response) {
                return error;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    }
}

export default profileService;