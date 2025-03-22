import api from './apiDashboard'

const deviceService = {
    get: async (user_id) => {
        try {
            const response = await api.get(`/devices/${user_id}`);
            console.log("Response GET /devices", response.data)
            return response;
        } catch (error) {
            console.log("Error GET /devices", error)
            if (error.response) {
                return error;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
    add: async (name, crop, min, max, user_id, type) => {
        try {
            const response = await api.post("/devices", { name, crop, min, max, user_id, type });
            console.log("Response POST /devices", response)
            return response;
        } catch (error) {
            console.log("ERROR POST /devices", error);
            if (error.response) {
                return error;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
    delete: async (id) => {
        try {
            const response = await api.delete(`/devices/delete/${id}`);
            console.log("Response DELETE /devices", response.msg)
            return response;
        } catch (error) {
            console.log("ERROR DELETE /devices", error);
            if (error.response) {
                return error;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
    update: async (name, crop, min, max, id, type) => {
        try {
            const response = await api.put(`/devices/update/${id}`, { name, crop, min, max, type });
            console.log("Reponse UPDATE /devices", response.msg)
            return response;
        } catch (error) {
            console.log("ERROR UPDATE /devices", error);
            if (error.response) {
                return error;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    }
}

export default deviceService;