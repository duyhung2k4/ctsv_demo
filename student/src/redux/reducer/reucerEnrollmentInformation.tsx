import { ModelGranduationInformation, ModelResultsOfAnnouncement } from "../../models/student/modelEnrollmentInformation";
import { ActionEnrollmentInformation, ActionTypeEnrollmentInformation } from "../action/actionEnrollmentInformation";


export interface ReducerEnrollmentInformation {
    GranduationInformation: ModelGranduationInformation
    ResultsOfAnnouncement: ModelResultsOfAnnouncement
}

const initialValue: ReducerEnrollmentInformation = {
    GranduationInformation: {},
    ResultsOfAnnouncement: {
        Toan: 0,
        Li: 0,
        Hoa: 0,
        Van: 0,
        Anh: 0,
        Sinh: 0,
        Su: 0,
        Dia: 0,
        CongDan: 0
    }
}

const reducerEnrollmentInformation = (state: ReducerEnrollmentInformation = initialValue, action: ActionEnrollmentInformation) => {

    switch (action.type) {
        case ActionTypeEnrollmentInformation.GET_GRANDUATION_INFORMATION:
            state = {
                ...state,
                GranduationInformation: action.payload !== undefined ? action.payload : {}
            }
            break;
        case ActionTypeEnrollmentInformation.GET_RESULTS_OF_ANNOUNCEMENT:
            state = {
                ...state,
                ResultsOfAnnouncement: action.payload !== undefined ? action.payload : {
                    Toan: 0,
                    Li: 0,
                    Hoa: 0,
                    Van: 0,
                    Anh: 0,
                    Sinh: 0,
                    Su: 0,
                    Dia: 0,
                    CongDan: 0,
                }
            }
            break;
        default:
            break;
    }

    return state;
}

export default reducerEnrollmentInformation;

