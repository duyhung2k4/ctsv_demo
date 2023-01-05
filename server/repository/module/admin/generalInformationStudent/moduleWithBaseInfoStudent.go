package generalinformationstudent

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func AdminCreateBaseInfoStudent(baseInfoStudent []model.StudentBaseInfo) error {

	db := database.Method
	create := db.Begin()

	for _, baseInfo := range baseInfoStudent {

		var baseInfoInDB model.StudentBaseInfo

		if err := create.Model(model.StudentBaseInfo{}).
			Where("student_id = ? AND teacher_id = ?", baseInfo.StudentId, baseInfo.TeacherId).
			First(&baseInfoInDB).Error; err != nil {
			create.Model(model.StudentBaseInfo{}).
				Create(&baseInfo)
		} else {
			create.Model(model.StudentBaseInfo{}).
				Where("id = ?", baseInfo.Id).
				Updates(&baseInfo)
		}
	}

	err := db.Debug().
		Model(model.StudentBaseInfo{}).
		Create(&baseInfoStudent).Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}

func AdminUpdateBaseInfoStudent(listBaseInfoStudent []model.StudentBaseInfo) error {

	db := database.Method

	update := db.Begin()

	for _, studentBaseInfo := range listBaseInfoStudent {
		update.Model(model.StudentBaseInfo{}).
			Where("id = ?", studentBaseInfo.Id).
			Updates(&studentBaseInfo)
	}

	err := update.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}

func AdminUpdateStudentBaseInfoById(studentBaseInfo model.StudentBaseInfo) error {

	db := database.Method

	err := db.Debug().
		Model(model.StudentBaseInfo{}).
		Where("id = ?", studentBaseInfo.Id).
		Updates(&studentBaseInfo).Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
