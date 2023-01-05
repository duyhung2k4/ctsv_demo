import { ModelAccountTeacher } from "../../../models/student/modelAccountTeacher"

export enum ActionTypeAccontTeacher {
    GET_ACCOUNT_TEACHER = "GET_ACCOUNT_TEACHER"
}

interface ActionGetAccountTeacher {
    type: ActionTypeAccontTeacher.GET_ACCOUNT_TEACHER
    payload: ModelAccountTeacher[]
}

export type ActionAccountTeacher = ActionGetAccountTeacher;