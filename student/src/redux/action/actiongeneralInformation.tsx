import { ModelAddress, ModelBank, ModelContact, ModelOverview, ModelStudentBaseInfo } from "../../models/student/modelGeneralInformation";

export enum ActionTypeGeneralInformation {
    CHANGE_MESSAGE = "CHANGE_MESSAGE",
    GET_BASE_INFO = "GET_BASE_INFO",
    GET_OVERVIEW = "GET_OVER_VIEW",
    GET_CONTACT = "GET_CONTACT",
    GET_ADDRESS = "GET_ADDRESS",
    GET_BANK = "GET_BANK"
}

interface ActionGetMessage {
    type: ActionTypeGeneralInformation.CHANGE_MESSAGE
    payload: string
}

interface ActionGetBaseInfo {
    type: ActionTypeGeneralInformation.GET_BASE_INFO
    payload: ModelStudentBaseInfo

}


interface ActionGetOverview {
    type: ActionTypeGeneralInformation.GET_OVERVIEW
    payload: ModelOverview
}

interface ActionGetContact {
    type: ActionTypeGeneralInformation.GET_CONTACT
    payload: ModelContact
}

interface ActionGetAddress {
    type: ActionTypeGeneralInformation.GET_ADDRESS
    payload: ModelAddress
}

interface ActionGetBank {
    type: ActionTypeGeneralInformation.GET_BANK
    payload: ModelBank
}

export type ActionGeneralInformation = ActionGetBaseInfo | ActionGetOverview | ActionGetMessage | ActionGetContact | ActionGetAddress | ActionGetBank;