export enum ActionLoginType {
    GET_MESSAGE = "GET_MESSAGE"
}

interface ActionGetMessage {
    type: ActionLoginType.GET_MESSAGE
    payload: string
}

export type ActionLogin = ActionGetMessage