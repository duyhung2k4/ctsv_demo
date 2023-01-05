import { getCookie } from "typescript-cookie";
import { Dispatch } from "redux";
import { ModelDataResponsive } from "../../../models/dataResponsive/modelDataResponsive";
import { ModelAccountStudent } from "../../../models/student/modelAccountStudent";
import { ActionGeneralInformation, ActionTypeGeneralInformation } from "../../action/student/actionGeneralInformation";
import { ModelStudentBaseInfo } from "../../../models/student/modelGeneralInformation";

export const ThunkFunctionInsertAccountStudent = (listAccount: ModelAccountStudent[]) => {
    return async (dispatch: Dispatch<ActionGeneralInformation>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        let listBaseInfo: ModelStudentBaseInfo[] = [];

        await fetch("http://localhost:3000/admin/student-account/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(listAccount)
        })
            .then(res => res.json())
            .then(async (data: ModelDataResponsive) => {
                if(data.Success === true && data.Data !== null) {
                    console.log(data.Message);
                    listBaseInfo = data.Data.ListStudentBaseInfo;
                }
            })

        await fetch("http://localhost:3000/admin/student-base-info/create", {
            method: "POST",
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