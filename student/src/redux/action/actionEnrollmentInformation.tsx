import { ModelGranduationInformation, ModelResultsOfAnnouncement } from "../../models/student/modelEnrollmentInformation"

export enum ActionTypeEnrollmentInformation {
    GET_GRANDUATION_INFORMATION = "GET_GRANDUATION_INFORMATION",
    GET_RESULTS_OF_ANNOUNCEMENT = "GET_RESULTS_OF_ANNOUNCEMENT"
}

interface ActionGetGranduationInformation {
    type: ActionTypeEnrollmentInformation.GET_GRANDUATION_INFORMATION
    payload: ModelGranduationInformation
}

interface ActionGetResultsOfAnnouncement {
    type: ActionTypeEnrollmentInformation.GET_RESULTS_OF_ANNOUNCEMENT
    payload: ModelResultsOfAnnouncement
}

export type ActionEnrollmentInformation = ActionGetGranduationInformation | ActionGetResultsOfAnnouncement;