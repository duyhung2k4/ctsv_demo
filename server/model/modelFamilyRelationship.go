package model

type Parents struct {
	BaseInfoId         int
	StudentBaseInfo    StudentBaseInfo `gorm:"foreignKey:BaseInfoId;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	Gender             bool
	Name               string `gorm:"DEFAULT:'null'"`
	DateOfBirth        string `gorm:"DEFAULT:'null'"`
	Ethnic             string `gorm:"DEFAULT:'null'"`
	Religion           string `gorm:"DEFAULT:'null'"`
	AcademicLevel      string `gorm:"DEFAULT:'null'"`
	PermanentResidence string `gorm:"DEFAULT:'null'"`
	PhoneNumber        string `gorm:"DEFAULT:'null'"`
	EconomicBefore1975 string `gorm:"DEFAULT:'null'"`
	EconomicAfter1975  string `gorm:"DEFAULT:'null'"`
	Email              string `gorm:"DEFAULT:'null'"`
}

type SiBlings struct {
	BaseInfoId            int
	StudentBaseInfo       StudentBaseInfo `gorm:"foreignKey:BaseInfoId;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	Relationship          string          `gorm:"DEFAULT:'null'"`
	Name                  string          `gorm:"DEFAULT:'null'"`
	DateOfBirth           string          `gorm:"DEFAULT:'null'"`
	Job                   string          `gorm:"DEFAULT:'null'"`
	Address               string          `gorm:"DEFAULT:'null'"`
	AdditionalInformation string          `gorm:"DEFAULT:'null'"`
}
