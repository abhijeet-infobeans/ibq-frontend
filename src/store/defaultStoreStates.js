/**
 * Build default store state from store models
 * Note: Should not go to localStorage
 */
import { authModelData } from './modules/Authentication/models/AuthModel'
import { projectModelData } from "@/store/modules/Project/models/ProjectModel";

export default function getDefaultStates() {
    return {
        drawer: false,
        // Reset states in the modules
        AuthModule: authModelData(),
        ProjectModule: projectModelData()
    }
}