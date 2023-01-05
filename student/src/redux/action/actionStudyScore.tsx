import { ModelStudyScore } from "../../models/student/modelStudyScore"

export enum ActionTypeStudyScore {
    GET_STUDY_SCORE = "GET_STUDY_SCORE"
}

interface ActionGetStudyScore {
    type: ActionTypeStudyScore.GET_STUDY_SCORE
    payload: ModelStudyScore[]
}

export type ActionStudyScore = ActionGetStudyScore;