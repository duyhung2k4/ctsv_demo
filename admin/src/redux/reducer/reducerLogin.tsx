import { ActionLogin, ActionLoginType } from "../action/login/actionAdminLogin";

export interface ReducerAdminLogin {
    Message: string
}

const initialValue: ReducerAdminLogin = {
    Message: ""
}

const reducerLogin = (state: ReducerAdminLogin = initialValue, action: ActionLogin) :ReducerAdminLogin => {

    switch (action.type) {
        case ActionLoginType.GET_MESSAGE:
            state = {
                ...state,
                Message: action.payload
            }
            break;
        default:
            break;
    }

    return state
}

export default reducerLogin