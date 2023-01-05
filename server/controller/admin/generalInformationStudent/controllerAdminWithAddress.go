package generalinformationstudent

import (
	"ctsv/model"
	getdataAddress "ctsv/repository/getdata/generalInformation"
	moduleAdminGeneralInformation "ctsv/repository/module/admin/generalInformationStudent"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"
)

// @Summary
// @Description Admin get contact of student
// @Tags Admin with address
// @Accept json
// @Produce json
// @Router /admin/student-address [get]
func AdminGetAddress(w http.ResponseWriter, r *http.Request) {

	listAddress, err := getdataAddress.GetAllAddress()

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data: model.DataRequest{
				ListAddress: listAddress,
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
// @Description Admin update address
// @Tags Admin with address
// @Accept json
// @Produce json
// @Param req body []model.Address false "List address need update" Format(model.Address)
// @Router /admin/student-address/update [put]
func AdminUpdateAddress(w http.ResponseWriter, r *http.Request) {

	var listAddress []model.Address
	json.NewDecoder(r.Body).Decode(&listAddress)

	err := moduleAdminGeneralInformation.UpdateAddressStudent(listAddress)

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
