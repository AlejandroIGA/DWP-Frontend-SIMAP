import api from './apiDashboard'

const notificationService = {
    get: async (user_id) => {
        try {
            const response = api.get(`/notifications/${user_id}`);
            console.log("Response GET /notifications", response.msg)
            return response;
        } catch (error) {
            console.log("Error GET /notifications", error)
            if (error.response) {
                return error;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
    add: async (name, description, user_id) => {
        try {
            const response = await api.post("/notifications", { name, description, user_id });
            console.log("Response POST /notifications");
            return response;
        } catch (error) {
            console.log("ERROR POST /notifications", error);
            if (error.response) {
                return error;
            } else {
                return "Error al conectar con el servidor";
            }
        }

    },
    delete: async (id) => {
        try {
            const response = await api.delete(`/notifications/delete/${id}`);
            console.log("Response DELETE /notifications", response.msg)
            return response;
        } catch (error) {
            console.log("ERROR DELETE /notifications", error);
            if (error.response) {
                return error;
            } else {
                return "Error al conectar con el servidor";
            }
        }
    },
}

export default notificationService;