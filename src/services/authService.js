import api from './api'

const authService = {
    login: async (email, password) => {
        try {
            const response = await api.post("/login", { email, password });
            return response;
        } catch (error) {
            console.log("ERROR /login");
            if (error.response) {
                return error;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
    register: async (name, phone, city, country, email, password) => {
        try {
            const response = await api.post("/register", { name, phone, city, country, email, password });
            console.log(response);
            return response;
        } catch (error) {
            console.log("ERROR /register");
            if (error.response) {
                return error;
            } else {
                return "Error al conectar con el servidor";
            }
        }

    },
    verify: async (email, token) => {
        try {
            const response = await api.post('/verify-otp', { email, token });
            console.log(response);
            return response;
        } catch (error) {
            console.log("ERROR /verify-otp")
            if (error.response) {
                return error;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    }
}

export default authService;