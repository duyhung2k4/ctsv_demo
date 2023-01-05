import { Dispatch } from "redux";
import { ModelStudentBaseInfo } from "../../models/modelStudentBaseInfo";
import { getCookie } from "typescript-cookie";
import { ModelDataResponsive } from "../../models/modelDataResponsice";
import { ActionCourseCode, ActionTypeCourseCode } from "../action/actionCourseCode";

export const ThunkfunctionCreateStudyCodeAndAttendance = (list_student: ModelStudentBaseInfo[], course_code_id: number) => {
    return async (dispatch: Dispatch<ActionCourseCode>) => {

        const accessToken : string | undefined = getCookie("accessToken");

        await fetch(`http://localhost:3000/teacher/${course_code_id}/create_studyScore_attendance`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(list_student)
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                dispatch({
                    type: ActionTypeCourseCode.CHANGE_MESSAGE,
                    payload: data.Success === true ? "Done" : "Error"
                })
            })
    }
}