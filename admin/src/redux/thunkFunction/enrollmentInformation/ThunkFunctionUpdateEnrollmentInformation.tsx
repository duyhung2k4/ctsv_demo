import { Dispatch } from "redux";
import { ModelGranduationInformation, ModelResultsOfAnnouncement } from "../../../models/student/modelEnrollmentInformation";
import { ActionGeneralInformation, ActionTypeGeneralInformation } from "../../action/student/actionGeneralInformation";
import { getCookie } from "typescript-cookie";
import { ModelDataResponsive } from "../../../models/dataResponsive/modelDataResponsive";

export const ThunkFunctionUpdateGranduationInformation = (listGranduationInformation: ModelGranduationInformation[]) => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/admin/student-granduation/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(listGranduationInformation)
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

export const ThunkFunctionUpdateResultsOfAnnouncement = (listResultsOfAnnouncement: ModelResultsOfAnnouncement[]) => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/admin/student-resultsOfAnnouncement/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(listResultsOfAnnouncement)
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