import { ModelCourseCode } from "./modelCourseCode"
import { ModelStudentBaseInfo } from "./modelStudentBaseInfo"

export interface ModelAttendance {
    BaseInfoId?: number
    CourseCodeId?: number
    StudentBaseInfo?: ModelStudentBaseInfo
    CourseCode?: ModelCourseCode
    Semester?: string
    ClassCode?: string
    NumberOfLessonsTaught?: number
    NumberOfSchoolDays?: number
    AbsenceWithoutPermission?: number
    UnexcusedAbsence?: number
    StudentCode?: string
}