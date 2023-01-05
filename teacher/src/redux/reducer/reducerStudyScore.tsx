import { ModelStudyScore } from "../../models/modelStudyScore";
import { ActionStudyScore, ActionTypeStudyScore } from "../action/actionStudyScore";

export interface ReducerStudyScore {
    ListStudyScore: ModelStudyScore[]
}

const initialValue: ReducerStudyScore = {
    ListStudyScore: []
}

const reducerStudyScore = (state: ReducerStudyScore = initialValue, action: ActionStudyScore) => {

    switch (action.type) {
        case ActionTypeStudyScore.GET_STUDY_SCORE:
            state = {
                ...state,
                ListStudyScore: action.payload !== undefined ? action.payload : []
            }
            break;
        default:
            break;
    }

    return state;
}

export default reducerStudyScore;