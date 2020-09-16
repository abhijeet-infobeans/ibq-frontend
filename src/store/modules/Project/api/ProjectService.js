import axios from 'axios'

export const projectService = {
    getProjects () {
        return axios.get('/api/v1/projectList');
    },
    addProject (data) {
        return axios.post(`/api/v1/addProject`, JSON.stringify({
            name: data.name,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
        }))
    }
}

