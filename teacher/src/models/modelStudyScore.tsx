import { ModelCourseCode } from "./modelCourseCode"
import { ModelStudentBaseInfo } from "./modelStudentBaseInfo"

export interface ModelStudyScore {
    BaseInfoId?: number
    CourseCodeId?: number
    StudentBaseInfo?: ModelStudentBaseInfo
	CourseCode?: ModelCourseCode
    StudentCode?: string
    CourseName?: string
    ShoolYear?: string
    Credits?: number
    Semester?: string
    ClassCode?: string
    ScalePoint10?: number
    ScalePoint4?: number
    LetterPoint?: string
}