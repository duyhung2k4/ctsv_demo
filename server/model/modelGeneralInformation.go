package model

type OverView struct {
	BaseInfoId                      int
	StudentBaseInfo                 StudentBaseInfo `gorm:"foreignKey:BaseInfoId;constraint:OnUpdate:CASCADE,Ondelete:SET NULL"`
	CccdNumber                      string          `gorm:"DEFAULT:'null'"`
	DateRange                       string          `gorm:"DEFAULT:'null'"`
	IssuedBy                        string          `gorm:"DEFAULT:'null'"`
	HealthInsuranceCardNumber       string          `gorm:"DEFAULT:'null'"`
	PolicyObject                    string          `gorm:"DEFAULT:'null'"`
	PriorityObject                  string          `gorm:"DEFAULT:'null'"`
	BloodGroup                      string          `gorm:"DEFAULT:'null'"`
	Nationality                     string          `gorm:"DEFAULT:'null'"`
	Ethnic                          string          `gorm:"DEFAULT:'null'"`
	Religion                        string          `gorm:"DEFAULT:'null'"`
	PartyAdmissionDate              string          `gorm:"DEFAULT:'null'"`
	NumberOfDecisionsToJoinTheParty string          `gorm:"DEFAULT:'null'"`
	DecisionDay                     string          `gorm:"DEFAULT:'null'"`
	DateOfAdmissionToTheUnion       string          `gorm:"DEFAULT:'null'"`
}

type Contact struct {
	BaseInfoId       int
	StudentBaseInfo  StudentBaseInfo `gorm:"foreignKey:BaseInfoId;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	PhoneNumber      string          `gorm:"DEFAULT:'null'"`
	Email            string          `gorm:"DEFAULT:'null'"`
	OtherPhoneNumber string          `gorm:"DEFAULT:'null'"`
	OtherEmail       string          `gorm:"DEFAULT:'null'"`
}

type Address struct {
	BaseInfoId                int
	StudentBaseInfo           StudentBaseInfo `gorm:"foreignKey:BaseInfoId;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	PlaceOfBirth              string          `gorm:"DEFAULT:'null'"`
	CurrentResidentialAddress string          `gorm:"DEFAULT:'null'"`
	PermanentAddress          string          `gorm:"DEFAULT:'null'"`
	AddressContact            string          `gorm:"DEFAULT:'null'"`
}

type Bank struct {
	BaseInfoId      int
	StudentBaseInfo StudentBaseInfo `gorm:"foreignKey:BaseInfoId;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	AccountHolder   string          `gorm:"DEFAULT:'null'"`
	Name            string          `gorm:"DEFAULT:'null'"`
	Branch          string          `gorm:"DEFAULT:'null'"`
	AccountNumber   string          `gorm:"DEFAULT:'null'"`
}
