package generalinformation

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"
)

func StudentUpdateContact(contact model.Contact) error {

	db := database.Method

	err := db.Debug().
		Model(model.Contact{}).
		Where("base_info_id = ?", contact.BaseInfoId).
		Updates(&contact).Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
