import api from './apiDashboard'

const notificationService = {
    get: async (id) => {
        try {
            const response = api.get("/notifications", { params: id });
            console.log("Response GET /notifications", response.msg)
            return response.data;
        } catch (error) {
            console.log("Error GET /notifications", error)
            if (error.response) {
                return error.response.data;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
    delete: async (id) => {
        try {
            const response = await api.delete("/notifications", { params: { id } });
            console.log("Response DELETE /notifications", response.msg)
            return response.data;
        } catch (error) {
            console.log("ERROR DELETE /notifications", error);
            if (error.response) {
                return error.response.data;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
}

export default notificationService;