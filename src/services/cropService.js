import api from './apiDashboard'

const cropService = {
    get: async (user_id) => {
        try {
            const response = await api.get(`/crops/${user_id}`);
            console.log("Response GET/crops", response.msg);
            return response;
        } catch (error) {
            console.log("ERROR GET/crops", error);
            if (error.response) {
                return error;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
    add: async (name, crop, tempMin, tempMax, humMin, humMax, humFmin, humFmax, type, space, user_id) => {
        try {
            const response = await api.post("/crops", { name, crop, tempMin, tempMax, humMin, humMax, humFmin, humFmax, type, space, user_id });
            console.log("Response POST /crops", response.msg);
            return response;
        } catch (error) {
            console.log("ERROR POST /crops", error);
            if (error.response) {
                return error;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
    delete: async (id) => {
        try {
            const response = await api.delete(`/crops/delete/${id}`);
            console.log("Response DELETE /crops", response.msg);
            return response;
        } catch (error) {
            console.log("ERROR DELETE /crops", error);
            if (error.response) {
                return error;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
    update: async (name, crop, tempMin, tempMax, humMin, humMax, humFmin, humFmax, type, space, id) => {
        try {
            const response = await api.put(`/crops/update/${id}`, { name, crop, tempMin, tempMax, humMin, humMax, humFmin, humFmax, type, space })
            console.log("Response UPDATE /crops", response.msg);
            return response;
        } catch (error) {
            console.log("ERROR UPDATE /crops", error);
            if (error.response) {
                return error;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
    getBySpace: async (user_id, space) => {
        try {
            const response = await api.get(`/crops/${user_id}/space/${space}`)
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
    }
}

export default cropService;