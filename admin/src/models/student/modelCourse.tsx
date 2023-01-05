import { ModelAccountTeacher } from "./modelAccountTeacher"

export interface ModelCourse {
    Id?: number
    Name?: string
    Code?: string
    TeacherId?: number
    Teacher?: ModelAccountTeacher
}