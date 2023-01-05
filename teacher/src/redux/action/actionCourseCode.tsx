import { ModelCourseCode } from "../../models/modelCourseCode"

export enum ActionTypeCourseCode {
    CHANGE_MESSAGE = "CHANGE_MESSAGE",
    GET_COURSE_CODE = "GET_COURSE_CODE"
}

interface ActionGetCourseCode {
    type: ActionTypeCourseCode.GET_COURSE_CODE
    payload: ModelCourseCode[]
}

interface ActionChangeMessage {
    type: ActionTypeCourseCode.CHANGE_MESSAGE,
    payload: string
}

export type ActionCourseCode = ActionGetCourseCode | ActionChangeMessage;