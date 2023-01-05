import { ModelAccountStudent } from "../../models/student/modelAccountStudent";
import { ModelAddress, ModelBank, ModelContact, ModelOverview, ModelStudentBaseInfo } from "../../models/student/modelGeneralInformation";
import { ActionGeneralInformation, ActionTypeGeneralInformation } from "../action/student/actionGeneralInformation";


export interface ReducerGeneralInformation {
    Message: string
    Account: ModelAccountStudent[]
    StudentBaseInfo: ModelStudentBaseInfo[]
    Overview: ModelOverview[]
    Contact: ModelContact[]
    Address: ModelAddress[]
    Bank: ModelBank[]
}

const initialValue: ReducerGeneralInformation = {
    Message: "",
    Account: [],
    StudentBaseInfo: [],
    Overview: [],
    Contact: [],
    Address: [],
    Bank: []
}

const reducerGeneralInformation = (state: ReducerGeneralInformation = initialValue, action: ActionGeneralInformation) :ReducerGeneralInformation => {

    switch (action.type) {
        case ActionTypeGeneralInformation.CHANGE_MESSAGE:
            state = {
                ...state,
                Message: action.payload
            }
            break;
        case ActionTypeGeneralInformation.GET_ACCOUNT_STUDENT:
            state = {
                ...state,
                Account: action.payload !== undefined ? [...action.payload] : []
            }
            break;
        case ActionTypeGeneralInformation.GET_STUDENT_BASE_INFO:
            state = {
                ...state,
                StudentBaseInfo: action.payload !== undefined ? [...action.payload] : []
            }
            break;
        case ActionTypeGeneralInformation.GET_STUDENT_OVERVIEW:
            state = {
                ...state,
                Overview: action.payload !== undefined ? [...action.payload] : []
            }
            break;
        case ActionTypeGeneralInformation.GET_STUDENT_CONTACT:
            state = {
                ...state,
                Contact: action.payload !== undefined ? [...action.payload] : []
            }
            break;
        case ActionTypeGeneralInformation.GET_STUDENT_ADDRESS:
            state = {
                ...state,
                Address: action.payload !== undefined ? [...action.payload] : []
            }
            break;
        case ActionTypeGeneralInformation.GET_STUDENT_BANK:
            state = {
                ...state,
                Bank: action.payload !== undefined ? [...action.payload] : []
            }
            break;
        default:
            break;
    }

    return state
}

export default reducerGeneralInformation