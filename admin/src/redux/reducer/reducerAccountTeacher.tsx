import { ModelAccountTeacher } from "../../models/student/modelAccountTeacher";
import { ActionAccountTeacher, ActionTypeAccontTeacher } from "../action/student/actionAccountTeacher";

export interface ReducerAccountTeacher {
    AccountTeacher: ModelAccountTeacher[]
}

const initialValue: ReducerAccountTeacher = {
    AccountTeacher: []
}

const reducerAccountTeacher = (state: ReducerAccountTeacher = initialValue, action: ActionAccountTeacher) => {

    switch (action.type) {
        case ActionTypeAccontTeacher.GET_ACCOUNT_TEACHER:
            state = {
                ...state,
                AccountTeacher: action.payload !== undefined ? action.payload : []
            }
            break;
        default:
            break;
    }

    return state;
}

export default reducerAccountTeacher;