import { Dispatch } from "redux"
import { ActionAttendance, ActionTypeAttendance } from "../../action/actionAttendance"
import { getCookie } from "typescript-cookie"
import { ModelDataResponsive } from "../../../models/modelDataResponsice"
import { ModelAttendance } from "../../../models/modelAttendance"
import { ActionCourseCode, ActionTypeCourseCode } from "../../action/actionCourseCode"

export const ThunkfunctionGetAttendance = (course_code_id: number) => {

    return async (dispatch: Dispatch<ActionAttendance>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch(`http://localhost:3000/teacher/attendance/${course_code_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                dispatch({
                    type: ActionTypeAttendance.GET_ATTENDANCE,
                    payload: data.Success === true ? data.Data.ListAttendance : []
                })
            })
        }
}

export const ThunkfunctionUpdateAttendance = (listAttendance: ModelAttendance[]) => {

    return async (dispatch: Dispatch<ActionCourseCode>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/teacher/attendance/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(listAttendance)
        })
        .then(res => res.json())
        .then((data: ModelDataResponsive) => {
            dispatch({
                type: ActionTypeCourseCode.CHANGE_MESSAGE,
                payload: data.Success === true ? "Done" : "Error"
            })
        })
    }
}