import api from './api'

const authService = {
    login: async (email, psw) => {
        try {
            const response = await api.post("/login", { email, psw });
            return response.data;
        } catch (error) {
            console.log("ERROR /login");
            if (error.response) {
                return error.response.data;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
    register: async (name, phone, city, country, email) => {
        try {
            const response = await api.post("/register", { name, phone, city, country, email });
            return response.data;
        } catch (error) {
            console.log("ERROR /register");
            if (error.response) {
                return error.response.data;
            } else {
                return "Error al conectar con el servidor";
            }
        }

    }
}

export default authService;