import { Dispatch } from "redux";
import { ActionGeneralInformation, ActionTypeGeneralInformation } from "../../action/student/actionGeneralInformation";
import { getCookie } from "typescript-cookie";
import { ModelDataResponsive } from "../../../models/dataResponsive/modelDataResponsive";

export const ThunkFunctionGetAccountStudent = () => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const token: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/admin/student-account", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                dispatch({
                    type: ActionTypeGeneralInformation.GET_ACCOUNT_STUDENT,
                    payload: data.Data.ListAccountStudent
                })
            })
    }
}

export const ThunkFunctionGetStudentBaseInfo = () => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/admin/student-base-info", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                if (data.Success === true) {
                    dispatch({
                        type: ActionTypeGeneralInformation.GET_STUDENT_BASE_INFO,
                        payload: data.Data.ListStudentBaseInfo
                    })
                }
            })
    }
}

export const ThunkFunctionGetOverview = () => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/admin/student-overview", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                if (data.Success === true) {
                    dispatch({
                        type: ActionTypeGeneralInformation.GET_STUDENT_OVERVIEW,
                        payload: data.Data.ListOverViewStudent
                    })
                }
            })
    }
}

export const ThunkFunctionGetContact = () => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/admin/student-contact", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                if (data.Success === true) {
                    dispatch({
                        type: ActionTypeGeneralInformation.GET_STUDENT_CONTACT,
                        payload: data.Data.ListContact
                    })
                }
            })
    }
}

export const ThunkFunctionGetAddress = () => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/admin/student-address", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                if (data.Success === true) {
                    dispatch({
                        type: ActionTypeGeneralInformation.GET_STUDENT_ADDRESS,
                        payload: data.Data.ListAddress
                    })
                }
            })
    }
}

export const ThunkFunctionGetBank = () => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/admin/student-bank", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                if (data.Success === true) {
                    dispatch({
                        type: ActionTypeGeneralInformation.GET_STUDENT_BANK,
                        payload: data.Data.ListBank
                    })
                }
            })
    }
}
