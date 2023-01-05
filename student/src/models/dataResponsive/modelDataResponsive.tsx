import { ModelAttendance } from "../student/modelAttendance"
import { ModelGranduationInformation, ModelResultsOfAnnouncement } from "../student/modelEnrollmentInformation"
import { ModelParents, ModelSiBlings } from "../student/modelFamilyRelationship"
import { ModelAddress, ModelBank, ModelContact, ModelOverview, ModelStudentBaseInfo } from "../student/modelGeneralInformation"
import { ModelStudyScore } from "../student/modelStudyScore"

export interface Data {
    Token: string
    StudentBaseInfo: ModelStudentBaseInfo
    Overview: ModelOverview
    Contact: ModelContact
    Address: ModelAddress
    Bank: ModelBank
    GranduationInformation: ModelGranduationInformation
    ResultsOfAnnouncement: ModelResultsOfAnnouncement
    Parents: ModelParents[]
    SiBlings: ModelSiBlings[]
    ListStudyScore: ModelStudyScore[]
    ListAttendance: ModelAttendance[]
}

export interface ModelDataResponsive {
    Data: Data
    Message: string
    Error: Error
    Success: boolean
}