import { ModelAttendance } from "./modelAttendance"
import { ModelCourseCode } from "./modelCourseCode"
import { ModelStudyScore } from "./modelStudyScore"

interface ModelData {
    Token: string
    CourseCode: ModelCourseCode
    ListCourseCode: ModelCourseCode[]
    ListStudyScore: ModelStudyScore[]
    ListAttendance: ModelAttendance[]
}

export interface ModelDataResponsive {
    Data: ModelData
    Message: string
    Error: Error
    Success: boolean
}