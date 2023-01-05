package enrollmentinformation

import (
	database "ctsv/config"
	"ctsv/model"
	"fmt"

	"gorm.io/gorm"
)

func CreateResultsOfAnnouncement(create *gorm.DB, listBaseInfo []model.StudentBaseInfo) {

	for _, baseInfo := range listBaseInfo {
		var resultsOfAnnouncement model.ResultsOfAnnouncement
		resultsOfAnnouncement.BaseInfoId = baseInfo.Id

		if err := create.Model(model.ResultsOfAnnouncement{}).
			Where("base_info_id = ?", resultsOfAnnouncement.BaseInfoId).
			First(&resultsOfAnnouncement).Error; err != nil {
			create.Model(model.ResultsOfAnnouncement{}).
				Create(&resultsOfAnnouncement)
		}
	}
}

func AdminUpdateResultsOfAnnouncement(listResultsOfAnnouncement []model.ResultsOfAnnouncement) error {

	db := database.Method
	update := db.Begin()

	for _, resultsOfAnnouncement := range listResultsOfAnnouncement {
		update.Model(model.ResultsOfAnnouncement{}).
			Where("base_info_id = ?", resultsOfAnnouncement.BaseInfoId).
			Updates(&resultsOfAnnouncement)
	}

	err := update.Commit().Error

	if err != nil {
		fmt.Println(err)
	}

	return err
}
