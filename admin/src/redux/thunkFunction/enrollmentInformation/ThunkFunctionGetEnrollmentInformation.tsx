import { Dispatch } from "redux"
import { ActionEnrollmentInformation, ActionTypeEnrollmentInformation } from "../../action/student/actionEnrollmentInformation"
import { getCookie } from "typescript-cookie"
import { ModelDataResponsive } from "../../../models/dataResponsive/modelDataResponsive"

 
export const ThunkFunctionGetGranduationInformation = () => {
    return async (dispatch: Dispatch<ActionEnrollmentInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/admin/student-granduation", {
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
                        type: ActionTypeEnrollmentInformation.GET_GRANDUATION_INFORMATION,
                        payload: data.Data.ListGranduationInformation
                    })
                }
            })
    }
}

export const ThunkFunctionGetResultsOfAnnouncement = () => {
    return async (dispatch: Dispatch<ActionEnrollmentInformation>) => {

        const  accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/admin/student-resultsOfAnnouncement", {
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
                        type: ActionTypeEnrollmentInformation.GET_RESULTS_OF_ANNOUNCEMENT,
                        payload: data.Data.ListResultsOfAnnouncement
                    })
                }
            })
    }
}