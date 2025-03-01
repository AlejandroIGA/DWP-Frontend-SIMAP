import api from './api'

const spaceService = {
    get: async (id) => {
        try {
            const response = await api.get("/spaces", { params: { id } })
            console.log("Response GET /spaces", response.data)
            return response.data;
        } catch (error) {
            console.log("Error GET /devices", error)
            return [];
        }
    }
}

export default spaceService