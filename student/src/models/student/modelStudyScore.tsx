import { ModelStudentBaseInfo } from "./modelGeneralInformation"
import { ModelTeacher } from "../teacher/ModelTeacher"


export interface ModelCourseCode {
    Id        :number
	Name      :string
	Code      :string
	TeacherId :number
	Teacher   :ModelTeacher
}

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