import { ModelGranduationInformation, ModelResultsOfAnnouncement } from "../../models/student/modelEnrollmentInformation";
import { ActionEnrollmentInformation, ActionTypeEnrollmentInformation } from "../action/student/actionEnrollmentInformation";

export interface ReducerEnrollmentInformation {
    GranduationInformation: ModelGranduationInformation[]
    ResultsOfAnnouncement: ModelResultsOfAnnouncement[]
}

const initialValue: ReducerEnrollmentInformation = {
    GranduationInformation: [],
    ResultsOfAnnouncement: []
}

const reducerEnrollmentInformation = (state: ReducerEnrollmentInformation = initialValue, action: ActionEnrollmentInformation) => {

    switch (action.type) {
        case ActionTypeEnrollmentInformation.GET_GRANDUATION_INFORMATION:
            state = {
                ...state,
                GranduationInformation: action.payload !== undefined ? action.payload : []
            }
            break;
        case ActionTypeEnrollmentInformation.GET_RESULTS_OF_ANNOUNCEMENT:
            state = {
                ...state,
                ResultsOfAnnouncement: action.payload !== undefined ? action.payload : []
            }
            break;
        default:
            break;
    }

    return state
}

export default reducerEnrollmentInformation;