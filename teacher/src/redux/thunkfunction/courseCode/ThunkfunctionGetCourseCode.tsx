import { Dispatch } from "redux"
import { ActionCourseCode, ActionTypeCourseCode } from "../../action/actionCourseCode"
import { getCookie } from "typescript-cookie"
import { ModelDataResponsive } from "../../../models/modelDataResponsice"

 
export const ThunkfunctionGetCourseCode = () => {
    return async (dispatch: Dispatch<ActionCourseCode>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/teacher/course_code", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                dispatch({
                    type: ActionTypeCourseCode.GET_COURSE_CODE,
                    payload: data.Success === true ? data.Data.ListCourseCode : []
                })
            })
    }
}