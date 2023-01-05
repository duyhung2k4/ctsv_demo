package generalinformationstudent

import (
	"ctsv/model"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"

	getdataAccountStudent "ctsv/repository/getdata/generalInformation"
	moduleAdminWithAccountStudent "ctsv/repository/module/admin/accountStudent"
)

// @Summary
// @Description Admin create account student
// @Tags Admin with account student
// @Accept json
// @Produce json
// @Param req body []model.Student false "List account student" Format(model.Student)
// @Router /admin/student-account/create [post]
func AdminCreateAccountStudent(w http.ResponseWriter, r *http.Request) {

	var accountStudent []model.Student
	json.NewDecoder(r.Body).Decode(&accountStudent)

	listBaseInfo, err := moduleAdminWithAccountStudent.AdminCreateAccountStudent(accountStudent)

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data: model.DataRequest{
				ListStudentBaseInfo: listBaseInfo,
			},
			Message: "Created Successfully!",
			Error:   nil,
			Success: true,
		})

		w.WriteHeader(http.StatusOK)
		w.Write(result)
	}
}

// @Summary
// @Description Admin get account student
// @Tags Admin with account student
// @Accept json
// @Produce json
// @Router /admin/student-account [get]
func AdminGetAccountStudent(w http.ResponseWriter, r *http.Request) {

	listAccountStudent, err := getdataAccountStudent.GetAccountStudent()

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data: model.DataRequest{
				ListAccountStudent: listAccountStudent,
			},
			Message: "",
			Error:   nil,
			Success: true,
		})

		w.WriteHeader(http.StatusOK)
		w.Write(result)
	}
}
