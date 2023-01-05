import { ModelAddress, ModelBank, ModelContact, ModelOverview, ModelStudentBaseInfo } from "../../models/student/modelGeneralInformation";
import { ActionTypeGeneralInformation, ActionGeneralInformation } from "../action/actiongeneralInformation";

 
export interface ReducerGeneralInformation {
    Message: string
    BaseInfo: ModelStudentBaseInfo
    Overview: ModelOverview
    Contact: ModelContact
    Address: ModelAddress
    Bank: ModelBank
}

const initialValue: ReducerGeneralInformation = {
    Message: "",
    BaseInfo: {},
    Overview: {},
    Contact: {},
    Address: {},
    Bank: {}
}

const reducerGeneralInformation = (state: ReducerGeneralInformation = initialValue, action: ActionGeneralInformation) => {

    switch (action.type) {
        case ActionTypeGeneralInformation.CHANGE_MESSAGE:
            state = {
                ...state,
                Message: action.payload
            }
            break;
        case ActionTypeGeneralInformation.GET_BASE_INFO:
            state = {
                ...state,
                BaseInfo: action.payload !== undefined ? action.payload : {}
            }
            break;
        case ActionTypeGeneralInformation.GET_OVERVIEW:
            state = {
                ...state,
                Overview: action.payload !== undefined ? action.payload : {}
            }
            break;
        case ActionTypeGeneralInformation.GET_CONTACT:
            state = {
                ...state,
                Contact: action.payload !== undefined ? action.payload : {}
            }
            break;
        case ActionTypeGeneralInformation.GET_ADDRESS:
            state = {
                ...state,
                Address: action.payload !== undefined ? action.payload : {}
            }
            break;
        case ActionTypeGeneralInformation.GET_BANK:
            state = {
                ...state,
                Bank: action.payload !== undefined ? action.payload : {}
            }
            break;
        default:
            break;
    }

    return state;
}

export default reducerGeneralInformation;