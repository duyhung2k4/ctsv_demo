import { ModelCourse } from "../../../models/student/modelCourse"

export enum ActionTypeCourse {
    GET_COURSE = "GET_COURSE"
}

interface ActionGetCourse {
    type: ActionTypeCourse.GET_COURSE
    payload: ModelCourse[]
}

export type ActionCourse = ActionGetCourse;