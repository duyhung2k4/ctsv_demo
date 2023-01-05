import { ModelAccountStudent } from "../student/modelAccountStudent"
import { ModelAccountTeacher } from "../student/modelAccountTeacher";
import { ModelCourse } from "../student/modelCourse";
import { ModelGranduationInformation, ModelResultsOfAnnouncement } from "../student/modelEnrollmentInformation";
import { ModelAddress, ModelBank, ModelContact, ModelOverview, ModelStudentBaseInfo } from "../student/modelGeneralInformation";

interface Data {
    Token: string
    ListAccountStudent: ModelAccountStudent[]
    ListStudentBaseInfo: ModelStudentBaseInfo[]
    ListOverViewStudent: ModelOverview[]
    ListContact: ModelContact[]
    ListAddress: ModelAddress[]
    ListBank: ModelBank[]
    ListGranduationInformation: ModelGranduationInformation[]
    ListResultsOfAnnouncement: ModelResultsOfAnnouncement[]
    ListAccountTeacher: ModelAccountTeacher[]
    ListCourseCode: ModelCourse[]
}

export interface ModelDataResponsive {
    Data: Data
    Error: any
    Message: string
    Success: boolean
}