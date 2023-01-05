import { Dispatch } from "redux";
import { ModelAccountStudent } from "../../../models/student/modelsAccountStudent";
import { ActionLogin, ActionTypeLogin } from "../../action/actionLogin";
import { ModelDataResponsive } from "../../../models/dataResponsive/modelDataResponsive";
import { setCookie } from "typescript-cookie";

export const ThunkfunctionLogin = (accountStudent: ModelAccountStudent) => {
    return async (dispatch: Dispatch<ActionLogin>) => {

        await fetch("http://localhost:3000/login/student", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(accountStudent)
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                if(data.Success === true) {

                    setCookie("accessToken", data.Data.Token, { expires: 1, path: "/" });

                    dispatch({
                        type: ActionTypeLogin.GET_MESSAGE,
                        payload: "Done"
                    })
                } else {
                    dispatch({
                        type: ActionTypeLogin.GET_MESSAGE,
                        payload: "Error"
                    })
                }
            })
    }
}