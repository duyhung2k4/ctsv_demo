import { Dispatch } from "redux"
import { ActionCourse, ActionTypeCourse } from "../../action/student/actionCourse"
import { getCookie } from "typescript-cookie"
import { ModelDataResponsive } from "../../../models/dataResponsive/modelDataResponsive"
import { ModelCourse } from "../../../models/student/modelCourse"
import { ActionGeneralInformation, ActionTypeGeneralInformation } from "../../action/student/actionGeneralInformation"

export const ThunkFunctionGetCourse = () => {
    return async (dispatch: Dispatch<ActionCourse>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/admin/student-courseCode", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                if(data.Success === true) {
                    dispatch({
                        type: ActionTypeCourse.GET_COURSE,
                        payload: data.Data.ListCourseCode
                    })
                }
            })
    }
}

export const ThunkFunctionCreateCourse = (listCourse: ModelCourse[]) => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/admin/student-courseCode/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(listCourse)
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                if(data.Success === true) {
                    dispatch({
                        type: ActionTypeGeneralInformation.CHANGE_MESSAGE,
                        payload: "Done"
                    })
                } else {
                    dispatch({
                        type: ActionTypeGeneralInformation.CHANGE_MESSAGE,
                        payload: "Error"
                    })
                }
            })
    }
}