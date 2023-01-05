import { ModelAttendance } from "../../models/modelAttendance"

export enum ActionTypeAttendance {
    GET_ATTENDANCE = "GET_ATTENDANCE"
}

interface ActionGetAttendance {
    type: ActionTypeAttendance.GET_ATTENDANCE
    payload: ModelAttendance[]
}

export type ActionAttendance = ActionGetAttendance;