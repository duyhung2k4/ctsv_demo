import { ModelAccountStudent } from "../../../models/student/modelAccountStudent";
import { ModelAddress, ModelBank, ModelContact, ModelOverview, ModelStudentBaseInfo } from "../../../models/student/modelGeneralInformation";

export enum ActionTypeGeneralInformation {
    CHANGE_MESSAGE = "CHANGE_MESSAGE",
    GET_ACCOUNT_STUDENT = "GET_ACCOUNT_STUDENT",
    GET_STUDENT_BASE_INFO = "GET_STUDENT_BASE_INFO",
    GET_STUDENT_OVERVIEW = "GET_STUDENT_OVERVIEW",
    GET_STUDENT_CONTACT = "GET_STUDENT_CONTACT",
    GET_STUDENT_ADDRESS = "GET_STUDENT_ADDRESS",
    GET_STUDENT_BANK = "GET_STUDENT_BANK"
}

interface ActionChangeMessage {
    type: ActionTypeGeneralInformation.CHANGE_MESSAGE
    payload: string
}

interface ActionGetAccountStudent {
    type: ActionTypeGeneralInformation.GET_ACCOUNT_STUDENT
    payload: ModelAccountStudent[]
}

interface ActionGetStudentBaseInfo {
    type: ActionTypeGeneralInformation.GET_STUDENT_BASE_INFO
    payload: ModelStudentBaseInfo[]
}

interface ActionGetStudentOverview {
    type: ActionTypeGeneralInformation.GET_STUDENT_OVERVIEW
    payload: ModelOverview[]
}

interface ActionGetContact {
    type: ActionTypeGeneralInformation.GET_STUDENT_CONTACT
    payload: ModelContact[]
}

interface ActionGetAddress {
    type: ActionTypeGeneralInformation.GET_STUDENT_ADDRESS
    payload: ModelAddress[]
}

interface ActionGetBank {
    type: ActionTypeGeneralInformation.GET_STUDENT_BANK
    payload: ModelBank[]
}

export type ActionGeneralInformation = ActionChangeMessage | ActionGetAccountStudent | ActionGetStudentBaseInfo | ActionGetStudentOverview | ActionGetContact | ActionGetAddress | ActionGetBank;