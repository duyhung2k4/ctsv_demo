package enrollmentinformation

import (
	"ctsv/model"
	getdataEnrollmentInformation "ctsv/repository/getdata/enrollmentInformation"
	moduleAdminWithEnrollmentinformation "ctsv/repository/module/admin/enrollmentInformation"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"
)

// @Summary
// @Description Admin get Results Of Announcement
// @Tags Admin with ResultsOfAnnouncement
// @Accept json
// @Produce json
// @Router /admin/student-resultsOfAnnouncement [get]
func AdminGetResultsOfAnnouncement(w http.ResponseWriter, r *http.Request) {

	listResultsOfAnnouncement, err := getdataEnrollmentInformation.GetAllResultsOfAnnouncement()

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data: model.DataRequest{
				ListResultsOfAnnouncement: listResultsOfAnnouncement,
			},
			Message: "",
			Error:   nil,
			Success: true,
		})

		w.WriteHeader(http.StatusOK)
		w.Write(result)
	}

}

// @Summary
// @Description Admin update ResultsOfAnnouncement
// @Tags Admin with ResultsOfAnnouncement
// @Accept json
// @Produce json
// @Param req body []model.ResultsOfAnnouncement false "list ResultsOfAnnouncement need update" Format(model.ResultsOfAnnouncement)
// @Router /admin/student-resultsOfAnnouncement/update [put]
func AdminUpdateResultsOfAnnouncement(w http.ResponseWriter, r *http.Request) {

	var listResultsOfAnnouncement []model.ResultsOfAnnouncement
	json.NewDecoder(r.Body).Decode(&listResultsOfAnnouncement)

	err := moduleAdminWithEnrollmentinformation.AdminUpdateResultsOfAnnouncement(listResultsOfAnnouncement)

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data:    nil,
			Message: "Updated Successfully!",
			Error:   nil,
			Success: true,
		})

		w.WriteHeader(http.StatusOK)
		w.Write(result)
	}
}
