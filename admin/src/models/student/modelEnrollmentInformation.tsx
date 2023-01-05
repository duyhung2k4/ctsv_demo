import { ModelStudentBaseInfo } from "./modelGeneralInformation"

export interface ModelGranduationInformation {
    BaseInfoId?: number
    StudentBaseInfo?: ModelStudentBaseInfo
    RankAcademic?: string
    RatingOfConduct?: string
    YearOfDecision?: string
    NumberOfGraduationDecisions?: string
    GraduationGrade?: string
}

export interface ModelResultsOfAnnouncement {
    BaseInfoId?: number
    StudentBaseInfo?: ModelStudentBaseInfo
    IndustryName?: string
    IndustryCode?: string
    Form?: string
    TotalScoreForAdmission?: string
    Award?: string
    InternationalCertificate?: string
    Toan?: number
    Van?: number
    Anh?: number
    Li?: number
    Hoa?: number
    Sinh?: number
    Su?: number
    Dia?: number
    CongDan?: number
}
