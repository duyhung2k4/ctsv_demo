import { ModelCourseCode } from "../../models/modelCourseCode";
import { ActionCourseCode, ActionTypeCourseCode } from "../action/actionCourseCode";

export interface ReducerCourseCode {
    ListCourseCode: ModelCourseCode[],
    Message: string
}

const initialValue: ReducerCourseCode = {
    ListCourseCode: [],
    Message: ""
}

const reducerCourseCode = (state: ReducerCourseCode = initialValue, action: ActionCourseCode) => {

    switch (action.type) {
        case ActionTypeCourseCode.GET_COURSE_CODE:
            state = {
                ...state,
                ListCourseCode: action.payload !== undefined ? action.payload : []
            }
            break;
        case ActionTypeCourseCode.CHANGE_MESSAGE:
            state = {
                ...state,
                Message: action.payload
            }
            break;
        default:
            break;
    }

    return state;
}

export default reducerCourseCode;