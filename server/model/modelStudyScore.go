package model

type StudyScore struct {
	BaseInfoId      int
	CourseCodeId    int
	StudentBaseInfo StudentBaseInfo `gorm:"foreignKey:BaseInfoId;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	CourseCode      CourseCode      `gorm:"foreignKey:CourseCodeId;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	StudentCode     string          `gorm:"DEFAULT:'null'"`
	CourseName      string          `gorm:"DEFAULT:'null'"`
	ShoolYear       string          `gorm:"DEFAULT:'null'"`
	Credits         int             `gorm:"DEFAULT:1"`
	Semester        string          `gorm:"DEFAULT:'null'"`
	ClassCode       string          `gorm:"DEFAULT:'null'"`
	ScalePoint10    float64         `gorm:"DEFAULT:0.0"`
	ScalePoint4     float64         `gorm:"DEFAULT:0.0"`
	LetterPoint     string          `gorm:"DEFAULT:'null'"`
}

type CourseCode struct {
	Id        int    `gorm:"primaryKey"`
	Name      string `gorm:"DEFAULT:'null'"`
	Code      string
	TeacherId int
	Teacher   Teacher `gorm:"foreignKey:TeacherId;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
}

type Class struct {
	Id        int `gorm:"primaryKey"`
	Name      string
	ClassCode string
}
