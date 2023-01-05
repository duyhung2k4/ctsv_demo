import { ModelTeacher } from "./modelTeacher"

export interface ModelCourseCode {
    Id        :number
	Name      :string
	Code      :string
	TeacherId :number
	Teacher   :ModelTeacher
}