import { Dispatch } from "redux"
import { ActionStudyScore, ActionTypeStudyScore } from "../../action/actionStudyScore"
import { getCookie } from "typescript-cookie"
import { ModelDataResponsive } from "../../../models/modelDataResponsice"
import { ModelStudyScore } from "../../../models/modelStudyScore"
import { ActionCourseCode, ActionTypeCourseCode } from "../../action/actionCourseCode"

 
export const ThunkfunctionGetStudyScore = (course_code_id: number) => {
    return async (dispatch: Dispatch<ActionStudyScore>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch(`http://localhost:3000/teacher/study_score/${course_code_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then((data: ModelDataResponsive) => {
                dispatch({
                    type: ActionTypeStudyScore.GET_STUDY_SCORE,
                    payload: data.Success === true ? data.Data.ListStudyScore : []
                })
            })
    }
}

export const ThunkfunctionUpdateStudyScore = (listStudyScore: ModelStudyScore[]) => {

    return async (dispatch: Dispatch<ActionCourseCode>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/teacher/study_score/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(listStudyScore)
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