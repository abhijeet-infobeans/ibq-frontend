import { projectModelData } from './models/ProjectModel'
import { projectService } from "@/store/modules/Project/api/ProjectService";

const ProjectModule = {
    namespaced: true,
    state: projectModelData(),
    getters: {
    },
    mutations: {
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        async getProjects ({ commit },{ resolve, reject }) {
            try {
                const response = await projectService.getProjects(status)
                const { success, data } = response.data
                if (success === true) {
                    resolve && resolve(data)
                } else {
                    reject && reject(data)
                }
            } catch (error) {
                reject && reject(error)
            }
        },
    }
}
export default ProjectModule