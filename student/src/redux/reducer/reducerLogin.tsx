import { ActionLogin, ActionTypeLogin } from "../action/actionLogin"

export interface ReducerLogin {
    Message: string
}

const initialValue: ReducerLogin = {
    Message: ""
}

const reducerLogin = (state: ReducerLogin = initialValue, action: ActionLogin) => {
    
    switch (action.type) {
        case ActionTypeLogin.GET_MESSAGE:
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

export default reducerLogin;