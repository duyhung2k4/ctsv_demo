import { ModelParents, ModelSiBlings } from "../../models/student/modelFamilyRelationship"

export enum ActionTypeFamilyRealtionship {
    GET_PARENTS = "GETPARENTS",
    GET_SIBLINGS = "GET_SIBLINGS"
}

interface ActionGetParents {
    type: ActionTypeFamilyRealtionship.GET_PARENTS
    payload: ModelParents[]
}

interface ActionGetSiBlings {
    type: ActionTypeFamilyRealtionship.GET_SIBLINGS
    payload: ModelSiBlings[]
}

export type ActionFamilyRealtionship = ActionGetParents | ActionGetSiBlings;