package checkexist

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func CheckexistAccountAdmin(admin model.Admin) (model.Admin, error) {

	db := database.Method

	var accountAdmin model.Admin

	err := db.Debug().
		Model(model.Admin{}).
		Where("email = ? AND pass = ?", admin.Email, admin.Pass).
		First(&accountAdmin).Error

	if err != nil {
		fmt.Println(err)
	}

	return accountAdmin, err
}
