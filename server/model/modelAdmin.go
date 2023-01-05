package model

type Admin struct {
	Id    int `gorm:"primaryKey"`
	Name  string
	Email string
	Pass  string
}
