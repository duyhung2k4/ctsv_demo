
export enum ActionTypeLogin {
    GET_MESSAGE = "GET_MESSAGE"
}

interface ActionGetMessage {
    type: ActionTypeLogin.GET_MESSAGE
    payload: string
}

export type ActionLogin = ActionGetMessage