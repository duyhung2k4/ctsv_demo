
export enum ActionTypeLogin {
    CHANGE_MESSAGE = "CHANGE_MESSAGE"
}

interface ActionTeacherLogin {
    type: ActionTypeLogin.CHANGE_MESSAGE
    payload: string
}

export type ActionLogin = ActionTeacherLogin