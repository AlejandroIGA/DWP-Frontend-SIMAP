import api from './api'

const deviceService = {
    get: async (user) => {
        try {
            const response = await api.get("/devices", { params: { user } });
            console.log("Response GET /devices", response.data)
            return response.data;
        } catch (error) {
            console.log("Error GET /devices", error)
            return [];
        }
    },
    add: async (name, crop, min, max, user, type) => {
        try {
            const response = await api.post("/devices", { name, crop, min, max, user, type });
            console.log("Response POST /devices", response.msg)
            return response.msg;
        } catch (error) {
            console.log("ERROR POST /devices", error);
            return "Error al guardar la información";
        }
    },
    delete: async (id) => {
        try {
            const response = await api.delete("/devices", { params: { id } });
            console.log("Response DELETE /devices", response.msg)
            return response.msg;
        } catch (error) {
            console.log("ERROR DELETE /devices", error);
            return "Error al eliminar el dispositivo";
        }
    },
    modify: async (name, crop, min, max, id, type) => {
        try {
            const response = await api.put("/devices", { name, crop, min, max, id, type });
            console.log("Reponse DELETE /devices", response.msg)
            return response.msg;

        } catch (error) {
            console.log("ERROR DELETE /devices", error);
            return "Error al modificar los datos";
        }
    }
}

export default deviceService;