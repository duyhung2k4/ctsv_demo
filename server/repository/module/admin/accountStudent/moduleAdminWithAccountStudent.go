package accountstudent

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
	"strconv"
)

func AdminCreateAccountStudent(accountStudents []model.Student) ([]model.StudentBaseInfo, error) {
	db := database.Method
	create := db.Begin()

	var baseInfoWhenCreated []model.StudentBaseInfo

	for _, accountStudent := range accountStudents {
		var account model.Student
		if err := create.Model(model.Student{}).
			Where("email = ?", accountStudent.Email).
			First(&account).Error; err != nil {

			create.Model(model.Student{}).
				Create(&accountStudent)

			var baseInfo model.StudentBaseInfo
			baseInfo.StudentId = accountStudent.Id
			baseInfo.TeacherId = 1
			baseInfo.StudentCode = strconv.Itoa(2200*1000 + accountStudent.Id)

			create.Model(model.StudentBaseInfo{}).
				Create(&baseInfo)

			baseInfoWhenCreated = append(baseInfoWhenCreated, baseInfo)
		}
	}

	err := create.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return baseInfoWhenCreated, err
}
