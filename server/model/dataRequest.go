package model

type Request struct {
	Data    interface{}
	Message string
	Error   interface{}
	Success bool
}

type DataRequest struct {
	Token                      string
	StudentBaseInfo            StudentBaseInfo
	Overview                   OverView
	Contact                    Contact
	Address                    Address
	Bank                       Bank
	StudyScore                 StudyScore
	GranduationInformation     GranduationInformation
	ResultsOfAnnouncement      ResultsOfAnnouncement
	CourseCode                 CourseCode
	Parents                    []Parents
	SiBlings                   []SiBlings
	ListAccountTeacher         []Teacher
	ListStudentBaseInfo        []StudentBaseInfo
	ListOverViewStudent        []OverView
	ListContact                []Contact
	ListAddress                []Address
	ListBank                   []Bank
	ListParent                 []Parents
	ListSiBlings               []SiBlings
	ListGranduationInformation []GranduationInformation
	ListResultsOfAnnouncement  []ResultsOfAnnouncement
	ListStudyScore             []StudyScore
	ListCourseCode             []CourseCode
	ListClass                  []Class
	ListAttendance             []Attendance
	ListAccountStudent         []Student
	Courses                    []Course
	Departments                []Department
}
