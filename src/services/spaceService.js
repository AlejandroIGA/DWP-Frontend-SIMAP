import api from './apiDashboard'

const spaceService = {
    get: async (user_id) => {
        try {
            const response = await api.get(`/spaces/${user_id}`)
            console.log("Response GET /spaces")
            return response;
        } catch (error) {
            console.log("Error GET /spaces", error)
            if (error.response) {
                return error;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
    add: async (name, user_id) => {
        try {
            const response = await api.post("/spaces", { name, user_id });
            console.log("Response POST /spaces")
            return response;
        } catch (error) {
            console.log("ERROR POST /spaces", error);
            if (error.response) {
                return error;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
    delete: async (id) => {
        try {
            const response = await api.delete(`/spaces/delete/${id}`);
            console.log("Response DELETE /spaces")
            return response;
        } catch (error) {
            console.log("ERROR DELETE /spaces", error);
            if (error.response) {
                return error;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
    update: async (name, id) => {
        try {
            const response = await api.put(`/spaces/update/${id}`, { name });
            console.log("Reponse UPDATE /sapaces")
            return response;
        } catch (error) {
            console.log("ERROR UPDATE /spaces", error);
            if (error.response) {
                return error.response;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    }
}

export default spaceService