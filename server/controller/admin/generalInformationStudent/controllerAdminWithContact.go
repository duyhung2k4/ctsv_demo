package generalinformationstudent

import (
	"ctsv/model"
	getdataInGeneralinformation "ctsv/repository/getdata/generalInformation"
	moduleAdminGeneralInformationStudent "ctsv/repository/module/admin/generalInformationStudent"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"
)

// @Summary
// @Description Admin get contact student
// @Tags Admin with contact
// @Accept json
// @Produce json
// @Router /admin/student-contact [get]
func AdminGetContactStudent(w http.ResponseWriter, r *http.Request) {

	listContact, err := getdataInGeneralinformation.GetAllContact()

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data: model.DataRequest{
				ListContact: listContact,
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
// @Description Admin update contact
// @Tags Admin with contact
// @Accept json
// @Produce json
// @Param req body []model.Contact false "List contact need update" Foramt(model.Contact)
// @Router /admin/student-contact/update [put]
func AdminUpdateContact(w http.ResponseWriter, r *http.Request) {

	var listContact []model.Contact
	json.NewDecoder(r.Body).Decode(&listContact)

	err := moduleAdminGeneralInformationStudent.UpdateContactStudent(listContact)

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
