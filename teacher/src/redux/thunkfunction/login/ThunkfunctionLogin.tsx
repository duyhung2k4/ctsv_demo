import { ModelTeacher } from "../../../models/modelTeacher";
import { Dispatch } from "redux";
import { ActionLogin, ActionTypeLogin } from "../../action/actionLogin";
import { ModelDataResponsive } from "../../../models/modelDataResponsice";
import { setCookie } from "typescript-cookie";

export const ThunkfunctionLogin = (teacher: ModelTeacher) => {
    return async (dispatch: Dispatch<ActionLogin>) => {

        await fetch("http://localhost:3000/login/teacher", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(teacher)
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                if(data.Success === true) {
                    setCookie("accessToken", data.Data.Token, { expires: 1 });
                }
                dispatch({
                    type: ActionTypeLogin.CHANGE_MESSAGE,
                    payload: data.Success === true ? "Done" : "Error"
                })
            })
    }
}