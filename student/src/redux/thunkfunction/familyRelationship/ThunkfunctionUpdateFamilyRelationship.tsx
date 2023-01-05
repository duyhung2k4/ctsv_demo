import { Dispatch } from "redux";
import { ModelParents, ModelSiBlings } from "../../../models/student/modelFamilyRelationship";
import { ActionGeneralInformation, ActionTypeGeneralInformation } from "../../action/actiongeneralInformation";
import { getCookie } from "typescript-cookie";
import { ModelDataResponsive } from "../../../models/dataResponsive/modelDataResponsive";

export const ThunkfunctionUpdateParents = (parents: ModelParents[]) => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/student/parents/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(parents)
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                dispatch({
                    type: ActionTypeGeneralInformation.CHANGE_MESSAGE,
                    payload: data.Success === true ? "Done" : "Error"
                })
            })
    }
}

export const ThunkfunctionUpdateSiblings = (siBlings: ModelSiBlings[]) => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        console.log(siBlings);

        await fetch("http://localhost:3000/student/siblings/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(siBlings)
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                dispatch({
                    type: ActionTypeGeneralInformation.CHANGE_MESSAGE,
                    payload: data.Success === true ? "Done" : "Error"
                })
            })
    }
}