import axios from 'axios'

export const projectService = {
    getProjects () {
        return axios.get('/api/v1/projectList');
    }
}