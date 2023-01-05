import { ModelParents, ModelSiBlings } from "../../models/student/modelFamilyRelationship";
import { ActionFamilyRealtionship, ActionTypeFamilyRealtionship } from "../action/actionFamilyRelationship";
 
export interface ReducerFamilyRelationship {
    Parents: ModelParents[]
    SiBlings: ModelSiBlings[]
}

const initialValue: ReducerFamilyRelationship = {
    Parents: [],
    SiBlings: []
}

const reducerFamilyRelationship = (state: ReducerFamilyRelationship = initialValue, action: ActionFamilyRealtionship) => {

    switch (action.type) {
        case ActionTypeFamilyRealtionship.GET_PARENTS:
            state = {
                ...state,
                Parents: action.payload !== undefined ? action.payload : []
            }
            break;
        case ActionTypeFamilyRealtionship.GET_SIBLINGS:
            state = {
                ...state,
                SiBlings: action.payload !== undefined ? action.payload : []
            }
            break;
        default:
            break;
    }

    return state;
}

export default reducerFamilyRelationship;

