import { ModelCourse } from "../../models/student/modelCourse";
import { ActionCourse, ActionTypeCourse } from "../action/student/actionCourse";

export interface ReducerCourse {
    Course: ModelCourse[]
}

const initialValue: ReducerCourse = {
    Course: []
}

const reducerCourse = (state: ReducerCourse = initialValue, action: ActionCourse) => {
    switch (action.type) {
        case ActionTypeCourse.GET_COURSE:
            state = {
                ...state,
                Course: action.payload !== undefined ? action.payload : []
            }
            break;
        default:
            break;
    }

    return state;
}

export default reducerCourse;