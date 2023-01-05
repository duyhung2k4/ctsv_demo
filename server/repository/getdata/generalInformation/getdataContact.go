package generalinformation

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func GetAllContact() ([]model.Contact, error) {

	db := database.Method

	var listContact []model.Contact

	err := db.Debug().
		Model(model.Contact{}).
		Preload("StudentBaseInfo").
		Find(&listContact).Error

	if err != nil {
		fmt.Println(err)
	}

	return listContact, err
}

func GetContactByBaseInfoId(baseInfoId int) (model.Contact, error) {

	db := database.Method

	var contact model.Contact

	err := db.Debug().
		Model(model.Contact{}).
		Where("base_info_id = ?", baseInfoId).
		First(&contact).Error

	if err != nil {
		fmt.Println(err)
	}

	return contact, err
}
