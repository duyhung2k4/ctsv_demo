import { Dispatch } from "redux"
import { ActionGeneralInformation, ActionTypeGeneralInformation } from "../../action/actiongeneralInformation"
import { getCookie } from "typescript-cookie"
import { ModelAddress, ModelBank, ModelContact, ModelOverview } from "../../../models/student/modelGeneralInformation"
import { ModelDataResponsive } from "../../../models/dataResponsive/modelDataResponsive"


export const ThunkfunctionUpdateGeneralInformation = (overview: ModelOverview, contact: ModelContact, address: ModelAddress, bank: ModelBank) => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");
        let mess_1: boolean = false;
        let mess_2: boolean = false;
        let mess_3: boolean = false;
        let mess_4: boolean = false;

        await fetch("http://localhost:3000/student/overview/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(overview)
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                mess_1 = data.Success
            })

        await fetch("http://localhost:3000/student/contact/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(contact)
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                mess_2 = data.Success
            })

        await fetch("http://localhost:3000/student/address/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(address)
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                mess_3 = data.Success
            })

        await fetch("http://localhost:3000/student/bank/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(bank)
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                mess_4 = data.Success
            })

        dispatch({
            type: ActionTypeGeneralInformation.CHANGE_MESSAGE,
            payload: mess_1 && mess_2 && mess_3 && mess_4 ? "Done" : "Error"
        })
    }
}

