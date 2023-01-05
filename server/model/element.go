package model

type Course struct {
	Id   int `gorm:"primaryKey"`
	Code string
}

type Department struct {
	Id   int `gorm:"primaryKey"`
	Code string
}
