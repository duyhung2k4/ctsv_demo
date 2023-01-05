import { ModelStudentBaseInfo } from "./modelGeneralInformation"
import { ModelCourseCode } from "./modelStudyScore"

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