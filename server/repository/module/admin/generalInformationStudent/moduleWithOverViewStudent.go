package generalinformationstudent

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"

	"gorm.io/gorm"
)

func CreateOverViewStudent(create *gorm.DB, listStudentBaseInfo []model.StudentBaseInfo) {

	for _, studentBaseInfo := range listStudentBaseInfo {
		var overViewStudent model.OverView
		overViewStudent.BaseInfoId = studentBaseInfo.Id

		if err := create.Model(model.OverView{}).
			Where("base_info_id = ?", overViewStudent.BaseInfoId).
			First(&overViewStudent); err != nil {
			create.Model(model.OverView{}).
				Create(&overViewStudent)
		}
	}

}

func UpdatedOverViewStudent(listOverViewStudent []model.OverView) error {

	db := database.Method
	update := db.Begin()

	for _, overviewStudent := range listOverViewStudent {
		update.Model(model.OverView{}).
			Where("base_info_id = ?", overviewStudent.BaseInfoId).
			Updates(&overviewStudent)
	}

	err := update.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
