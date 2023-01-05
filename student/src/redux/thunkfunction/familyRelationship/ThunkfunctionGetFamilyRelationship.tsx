import { Dispatch } from "redux"
import { ActionFamilyRealtionship, ActionTypeFamilyRealtionship } from "../../action/actionFamilyRelationship"
import { getCookie } from "typescript-cookie"
import { ModelDataResponsive } from "../../../models/dataResponsive/modelDataResponsive"

export const ThunkfunctionGetParents = () => {
    return async (dispatch: Dispatch<ActionFamilyRealtionship>) => {
 
        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/student/parents", {
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
                        type: ActionTypeFamilyRealtionship.GET_PARENTS,
                        payload: data.Data.Parents
                    })
                }
            })
    }
}

export const ThunkfunctionGetSiBlings = () => {
    return async (dispatch: Dispatch<ActionFamilyRealtionship>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/student/siblings", {
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
                        type: ActionTypeFamilyRealtionship.GET_SIBLINGS,
                        payload: data.Data.SiBlings
                    })
                }
            })
    }
}