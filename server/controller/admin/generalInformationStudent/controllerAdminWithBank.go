package generalinformationstudent

import (
	"ctsv/model"
	getdataInGeneralinformation "ctsv/repository/getdata/generalInformation"
	moduleAdminGeneralInformation "ctsv/repository/module/admin/generalInformationStudent"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"
)

// @Summary
// @Description Admin get bank of student
// @Tags Admin with bank
// @Accept json
// @Produce json
// @Router /admin/student-bank [get]
func AdminGetBank(w http.ResponseWriter, r *http.Request) {

	listBank, err := getdataInGeneralinformation.GetAllBank()

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data: model.DataRequest{
				ListBank: listBank,
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
// @Description Admin update bank of student
// @Tags Admin with bank
// @Accept json
// @Produce json
// @Param req body []model.Bank false "List bank need update" Format(model.Bank)
// @Router /admin/student-bank/update [put]
func AdminUpdateBank(w http.ResponseWriter, r *http.Request) {

	var listBank []model.Bank
	json.NewDecoder(r.Body).Decode(&listBank)

	err := moduleAdminGeneralInformation.UpdateBankStudent(listBank)

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
