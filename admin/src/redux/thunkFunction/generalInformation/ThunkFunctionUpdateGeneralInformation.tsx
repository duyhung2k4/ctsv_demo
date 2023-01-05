import { Dispatch } from "redux";
import { ModelAddress, ModelBank, ModelContact, ModelOverview, ModelStudentBaseInfo } from "../../../models/student/modelGeneralInformation";
import { ActionGeneralInformation, ActionTypeGeneralInformation } from "../../action/student/actionGeneralInformation";
import { getCookie } from "typescript-cookie";
import { ModelDataResponsive } from "../../../models/dataResponsive/modelDataResponsive";

export const ThunkFunctionUpdateBaseInfo = (listBaseInfo: ModelStudentBaseInfo[]) => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/admin/student-base-info/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(listBaseInfo)
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

export const ThunkFunctionUpdateOverview = (listOverview: ModelOverview[]) => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/admin/student-overview/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(listOverview)
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

export const ThunkFunctionUpdateContact = (listContact: ModelContact[]) => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/admin/student-contact/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(listContact)
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

export const ThunkFunctionUpdateAddress = (listAddress: ModelAddress[]) => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/admin/student-address/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(listAddress)
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

export const ThunkFunctionUpdateBank = (listBank: ModelBank[]) => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/admin/student-bank/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(listBank)
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