import { Dispatch } from "redux";
import { ActionGeneralInformation, ActionTypeGeneralInformation } from "../../action/actiongeneralInformation";
import { getCookie } from "typescript-cookie";
import { ModelDataResponsive } from "../../../models/dataResponsive/modelDataResponsive";
import { resolveTypeReferenceDirective } from "typescript";

export const ThunkfunctionGetBaseInfo = () => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/student/base_info", {
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
                        type:ActionTypeGeneralInformation.GET_BASE_INFO,
                        payload: data.Data.StudentBaseInfo
                    })
                }
            })
    }
}

export const ThunkfunctionGetOverview = () => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/student/overview", {
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
                        type: ActionTypeGeneralInformation.GET_OVERVIEW,
                        payload: data.Data.Overview
                    })
                }
            })
    }
}
 
export const ThunkfunctionGetContact = () => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/student/contact", {
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
                        type: ActionTypeGeneralInformation.GET_CONTACT,
                        payload: data.Data.Contact
                    })
                }
            })
    }
}

export const ThunkfuntionGetAddress = () => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/student/address", {
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
                        type: ActionTypeGeneralInformation.GET_ADDRESS,
                        payload: data.Data.Address
                    })
                }
            })
    }
}

export const ThunkfunctionGetBank = () => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/student/bank", {
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
                        type: ActionTypeGeneralInformation.GET_BANK,
                        payload: data.Data.Bank
                    })
                }
            })
    }
}