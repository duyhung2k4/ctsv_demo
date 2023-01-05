import { Dispatch } from "redux"
import { ActionAccountTeacher, ActionTypeAccontTeacher } from "../../action/student/actionAccountTeacher"
import { getCookie } from "typescript-cookie"
import { ModelDataResponsive } from "../../../models/dataResponsive/modelDataResponsive"
import { ModelAccountTeacher } from "../../../models/student/modelAccountTeacher"
import { ActionGeneralInformation, ActionTypeGeneralInformation } from "../../action/student/actionGeneralInformation"

 
export const ThunkFunctionGetAccountTeacher = () => {
    return async (dispatch: Dispatch<ActionAccountTeacher>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/admin/teacher-account", {
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
                        type: ActionTypeAccontTeacher.GET_ACCOUNT_TEACHER,
                        payload: data.Data.ListAccountTeacher
                    })
                }
            })
    }
}

export const ThunkFunctionCreateAccountTeacher = (listAccountTeacher: ModelAccountTeacher[]) => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/admin/teacher-account/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(listAccountTeacher)
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