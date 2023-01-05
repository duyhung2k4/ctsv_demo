import { Dispatch } from "redux"
import { ActionStudyScore, ActionTypeStudyScore } from "../../action/actionStudyScore"
import { getCookie } from "typescript-cookie"
import { ModelDataResponsive } from "../../../models/dataResponsive/modelDataResponsive"

 
export const ThunkfunctionGetStudyScore = () => {
    return async (dispatch: Dispatch<ActionStudyScore>) => {

        const accessToken: string | undefined = getCookie("accessToken");

        await fetch("http://localhost:3000/student/study_score", {
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