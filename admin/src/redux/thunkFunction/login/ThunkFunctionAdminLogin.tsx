import { Dispatch } from "redux";
import { ModelAccountAdmin } from "../../../models/admin/modelAdmin";
import { ModelDataResponsive } from "../../../models/dataResponsive/modelDataResponsive";
import { ActionLogin, ActionLoginType } from "../../action/login/actionAdminLogin";
import { setCookie } from "typescript-cookie";

export const ThunkFunctionAdminLogin = (email: string, pass: string) => {
    return async (dispatch: Dispatch<ActionLogin>) => {

        const account: ModelAccountAdmin = {
            Email: email,
            Pass: pass
        }

        await fetch("http://localhost:3000/login/admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(account)
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                if(data.Success === true) {
                    setCookie("accessToken", data.Data.Token, { expires: 1, path: "/" })
                    dispatch({
                        type: ActionLoginType.GET_MESSAGE,
                        payload: "Done"
                    })
                } else {
                    dispatch({
                        type: ActionLoginType.GET_MESSAGE,
                        payload: "Error"
                    })
                }
            })
    }
}