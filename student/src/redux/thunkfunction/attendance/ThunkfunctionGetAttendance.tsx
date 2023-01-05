import { Dispatch } from "redux"
import { ActionAttendance, ActionTypeAttendance } from "../../action/actionAttendance"
import { getCookie } from "typescript-cookie"
import { ModelDataResponsive } from "../../../models/dataResponsive/modelDataResponsive"

export const ThunkfunctionGetAttendance = () => {
    return async (dispatch: Dispatch<ActionAttendance>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/student/attendance", {
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