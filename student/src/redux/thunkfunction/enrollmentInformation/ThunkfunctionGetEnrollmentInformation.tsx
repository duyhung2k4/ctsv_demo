import { Dispatch } from "redux"
import { ActionEnrollmentInformation, ActionTypeEnrollmentInformation } from "../../action/actionEnrollmentInformation"
import { getCookie } from "typescript-cookie"
import { ModelDataResponsive } from "../../../models/dataResponsive/modelDataResponsive"

export const ThunkfunctionGetGranduationInformation = () => {
    return async (dispatch: Dispatch<ActionEnrollmentInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/student/enrollment/granduation_information", {
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
                        payload: data.Data.GranduationInformation
                    })
                }
            })
    }
}

export const ThunkfunctionGetResultsOfAnnouncement = () => {
    return async (dispatch: Dispatch<ActionEnrollmentInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/student/enrollment/results_of_announcement", {
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
                        payload: data.Data.ResultsOfAnnouncement
                    })
                }
            })
    }
}