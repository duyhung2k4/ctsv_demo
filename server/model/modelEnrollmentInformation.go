package model

type GranduationInformation struct {
	BaseInfoId                  int
	StudentBaseInfo             StudentBaseInfo `gorm:"foreignKey:BaseInfoId;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	RankAcademic                string          `gorm:"DEFAULT:'null'"`
	RatingOfConduct             string          `gorm:"DEFAULT:'null'"`
	YearOfDecision              string          `gorm:"DEFAULT:'null'"`
	NumberOfGraduationDecisions string          `gorm:"DEFAULT:'null'"`
	GraduationGrade             string          `gorm:"DEFAULT:'null'"`
}

type ResultsOfAnnouncement struct {
	BaseInfoId               int
	StudentBaseInfo          StudentBaseInfo `gorm:"foreignKey:BaseInfoId;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	IndustryName             string          `gorm:"DEFAULT:'null'"`
	IndustryCode             string          `gorm:"DEFAULT:'null'"`
	Form                     string          `gorm:"DEFAULT:'null'"`
	TotalScoreForAdmission   string          `gorm:"DEFAULT:'null'"`
	Award                    string          `gorm:"DEFAULT:'null'"`
	InternationalCertificate string          `gorm:"DEFAULT:'null'"`
	Combination              string          `gorm:"DEFAULT:'A00'"`
	Toan                     float64         `gorm:"DEFAULT: 0.0"`
	Van                      float64         `gorm:"DEFAULT: 0.0"`
	Anh                      float64         `gorm:"DEFAULT: 0.0"`
	Li                       float64         `gorm:"DEFAULT: 0.0"`
	Hoa                      float64         `gorm:"DEFAULT: 0.0"`
	Sinh                     float64         `gorm:"DEFAULT: 0.0"`
	Su                       float64         `gorm:"DEFAULT: 0.0"`
	Dia                      float64         `gorm:"DEFAULT: 0.0"`
	CongDan                  float64         `gorm:"DEFAULT: 0.0"`
}
