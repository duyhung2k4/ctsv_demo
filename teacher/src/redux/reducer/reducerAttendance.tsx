import { ModelAttendance } from "../../models/modelAttendance";
import { ActionAttendance, ActionTypeAttendance } from "../action/actionAttendance";

export interface ReducerAttendance {
    ListAttendance: ModelAttendance[]
}

const initialValue: ReducerAttendance = {
    ListAttendance: []
}

const reducerAttendance = (state: ReducerAttendance = initialValue, action: ActionAttendance) => {
    
    switch (action.type) {
        case ActionTypeAttendance.GET_ATTENDANCE:
            state = {
                ...state,
                ListAttendance: action.payload !== undefined ? action.payload : []
            }
            break;
        default:
            break;
    }

    return state;
}

export default reducerAttendance;