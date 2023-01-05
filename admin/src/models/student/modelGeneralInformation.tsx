import { ModelAccountStudent } from "./modelAccountStudent"
import { ModelAccountTeacher } from "./modelAccountTeacher"

export interface ModelStudentBaseInfo {
    Id?: number
    Status?: boolean
    Gender?: boolean
    Image?: string
    Firstname?: string
    Lastname?: string
    Class?: string
    DateOfBirth?: string
    StudentCode?: string
    TrainingSystem?: string
    Position?: string
    Branch?: string
    EducationProgram?: string
    Department?: string
    Course?: string
    Email?: string
    TeacherId?: number
    StudentId?: number
    Teacher?: ModelAccountTeacher
    Student?: ModelAccountStudent
}

export interface ModelOverview {
    BaseInfoId?: number
    StudentBaseInfo?: ModelStudentBaseInfo
    CccdNumber?: string
    DateRange?: string
    IssuedBy?: string
    HealthInsuranceCardNumber?: string
    PolicyObject?: string
    PriorityObject?: string
    BloodGroup?: string
    Nationality?: string
    Ethnic?: string
    Religion?: string
    PartyAdmissionDate?: string
    NumberOfDecisionsToJoinTheParty?: string
    DecisionDay?: string
    DateOfAdmissionToTheUnion?: string
}

export interface ModelContact {
    BaseInfoId?: number
    StudentBaseInfo?: ModelStudentBaseInfo
    PhoneNumber?: string
    Email?: string
    OtherPhoneNumber?: string
    OtherEmail?: string
}

export interface ModelAddress {
    BaseInfoId?: number
    StudentBaseInfo?: ModelStudentBaseInfo
    PlaceOfBirth?: string
    CurrentResidentialAddress?: string
    PermanentAddress?: string
    AddressContact?: string
}

export interface ModelBank {
    BaseInfoId?: number
    StudentBaseInfo?: ModelStudentBaseInfo
    AccountHolder?: string
    Name?: string
    Branch?: string
    AccountNumber?: string
}