package model

type Student struct {
	Id    int `gorm:"primaryKey"`
	Email string
	Pass  string
}

type StudentBaseInfo struct {
	Id               int `gorm:"primaryKey"`
	Status           bool
	Gender           bool
	Image            string `gorm:"DEFAULT:'null'"`
	Firstname        string `gorm:"DEFAULT:'null'"`
	Lastname         string `gorm:"DEFAULT:'null'"`
	Class            string `gorm:"DEFAULT:'null'"`
	DateOfBirth      string `gorm:"DEFAULT:'null'"`
	StudentCode      string `gorm:"DEFAULT:'null'"`
	TrainingSystem   string `gorm:"DEFAULT:'null'"`
	Position         string `gorm:"DEFAULT:'null'"`
	Branch           string `gorm:"DEFAULT:'null'"`
	EducationProgram string `gorm:"DEFAULT:'null'"`
	Department       string `gorm:"DEFAULT:'null'"`
	Course           string `gorm:"DEFAULT:'null'"`
	Email            string `gorm:"DEFAULT:'null'"`
	TeacherId        int    `gorm:"DEFAULT: 1"`
	StudentId        int
	Teacher          Teacher `gorm:"foreignKey:TeacherId;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	Student          Student `gorm:"foreignKey:StudentId;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
}

type Teacher struct {
	Id    int    `gorm:"primarykey"`
	Name  string `gorm:"DEFAULT:'null'"`
	Email string `gorm:"DEFAULT:'null'"`
	Pass  string `gorm:"DEFAULT:'null'"`
	Phone string `gorm:"DEFAULT:'null'"`
}

type Attendance struct {
	BaseInfoId               int
	CourseCodeId             int
	StudentBaseInfo          StudentBaseInfo `gorm:"foreignKey:BaseInfoId;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	CourseCode               CourseCode      `gorm:"foreignKey:CourseCodeId;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	Semester                 string          `gorm:"DEFAULT:'null'"`
	ClassCode                string          `gorm:"DEFAULT:'null'"`
	NumberOfLessonsTaught    int             `gorm:"DEFAULT:0"`
	NumberOfSchoolDays       int             `gorm:"DEFAULT:0"`
	AbsenceWithoutPermission int             `gorm:"DEFAULT:0"`
	UnexcusedAbsence         int             `gorm:"DEFAULT:0"`
	StudentCode              string          `gorm:"DEFAULT:'null'"`
}
