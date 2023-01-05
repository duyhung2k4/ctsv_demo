import { ModelStudentBaseInfo } from "./modelGeneralInformation"

export interface ModelParents {
    BaseInfoId?: number
    StudentBaseInfo?: ModelStudentBaseInfo
    Gender?: boolean
    Name?: string
    DateOfBirth?: string
    Ethnic?: string
    Religion?: string
    AcademicLevel?: string
    PermanentResidence?: string
    PhoneNumber?: string
    EconomicBefore1975?: string
    EconomicAfter1975?: string
    Email?: string
}

export interface ModelSiBlings {
    BaseInfoId?: number
    StudentBaseInfo?: ModelStudentBaseInfo
    Relationship?: string
    Name?: string
    DateOfBirth?: string
    Job?: string
    Address?: string
    AdditionalInformation?: string
}