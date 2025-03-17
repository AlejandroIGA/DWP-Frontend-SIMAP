import api from './apiDashboard'

const cropService = {
    get: async (id) => {
        try {
            const response = await api.get("/crops", { params: id });
            console.log("Response GET/crops", response.msg);
            return response.data;
        } catch (error) {
            console.log("ERROR GET/crops", error);
            if (error.response) {
                return error.response.data;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
    add: async (name, crop, tempMin, tempMax, humMin, humMax, humFmin, humFmax, type, space) => {
        try {
            const response = await api.post("/crops", { name, crop, tempMin, tempMax, humMin, humMax, humFmin, humFmax, type, space });
            console.log("Response POST /crops", response.msg);
            return response.data;
        } catch (error) {
            console.log("ERROR POST /crops", error);
            if (error.response) {
                return error.response.data;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
    delete: async (id) => {
        try {
            const response = await api.delete("/crops", { param: id });
            console.log("Response DELETE /crops", response.msg);
            return response.data;
        } catch (error) {
            console.log("ERROR DELETE /crops", error);
            if (error.response) {
                return error.response.data;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
    update: async (name, crop, tempMin, tempMax, humMin, humMax, humFmin, humFmax, type, space, id) => {
        try {
            const response = await api.put("/crops", { name, crop, tempMin, tempMax, humMin, humMax, humFmin, humFmax, type, space, id })
            console.log("Response UPDATE /crops", response.msg);
            return response.data;
        } catch (error) {
            console.log("ERROR UPDATE /crops", error);
            if (error.response) {
                return error.response.data;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    }
}

export default cropService;