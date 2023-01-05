import { ModelTeacher } from "./modelTeacher";

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
    Teacher?: ModelTeacher
}