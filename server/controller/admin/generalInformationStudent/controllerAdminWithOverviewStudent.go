package generalinformationstudent

import (
	"ctsv/model"
	getdata "ctsv/repository/getdata/generalInformation"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"

	moduleAdminGeneralInformationStudent "ctsv/repository/module/admin/generalInformationStudent"
)

// @Summary
// @Description Admin get overview student
// @Tags Admin with overview student
// @Accept json
// @Produce json
// @Router /admin/student-overview [get]
func AdminGetOverViewStudent(w http.ResponseWriter, r *http.Request) {

	listOverViewStudent, err := getdata.GetAllOverViewStudent()

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data: model.DataRequest{
				ListOverViewStudent: listOverViewStudent,
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
// @Description Admin update overview student
// @Tags Admin with overview student
// @Accept json
// @Produce json
// @Param req body []model.OverView false "List Overview need update" Format(model.OverView)
// @Router /admin/student-overview/update [put]
func AdminUpdateOverViewStudent(w http.ResponseWriter, r *http.Request) {

	var listOverViewStudent []model.OverView
	json.NewDecoder(r.Body).Decode(&listOverViewStudent)

	err := moduleAdminGeneralInformationStudent.UpdatedOverViewStudent(listOverViewStudent)

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
