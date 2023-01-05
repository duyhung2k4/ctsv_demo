package accountteacher

import (
	"ctsv/model"
	getdataAccountTeacher "ctsv/repository/getdata/accountTeacher"
	moduleAdminWithAccountTeacher "ctsv/repository/module/admin/accountTeacher"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"
)

// @Summary
// @Description Admin create account teacher
// @Tags Admin with account teacher
// @Accept json
// @Produce json
// @Param req body []model.Teacher false "List account teacher" Format(model.Teacher)
// @Router /admin/teacher-account/create [post]
func AdminCreateAccountTeacher(w http.ResponseWriter, r *http.Request) {

	var accountTeacher []model.Teacher
	json.NewDecoder(r.Body).Decode(&accountTeacher)

	err := moduleAdminWithAccountTeacher.AdminCreateAccountTeacher(accountTeacher)

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data:    nil,
			Message: "Created Successfully!",
			Error:   nil,
			Success: true,
		})

		w.WriteHeader(http.StatusOK)
		w.Write(result)
	}

}

// @Summary
// @Description Admin get account teacher
// @Tags Admin with account teacher
// @Accept json
// @Produce json
// @Router /admin/teacher-account [get]
func AdminGetAccountTeacher(w http.ResponseWriter, r *http.Request) {

	listAccountTeacher, err := getdataAccountTeacher.GetAccountTeacher()

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data: model.DataRequest{
				ListAccountTeacher: listAccountTeacher,
			},
			Message: "",
			Error:   nil,
			Success: true,
		})

		w.WriteHeader(http.StatusOK)
		w.Write(result)
	}
}
