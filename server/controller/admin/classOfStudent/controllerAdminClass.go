package classofstudent

import (
	"ctsv/model"
	getdataClass "ctsv/repository/getdata/classOfStudent"
	moduleAdminClass "ctsv/repository/module/admin/classOfStudent"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"
)

// @Summary
// @Description Admin create class
// @Tags Admin with class
// @Accept json
// @Produce json
// @Param req body []model.Class false "class" Format(model.Class)
// @Router /admin/student-class/create [post]
func AdminCreateClass(w http.ResponseWriter, r *http.Request) {

	var listClass []model.Class
	json.NewDecoder(r.Body).Decode(&listClass)

	err := moduleAdminClass.AdminCreateClass(listClass)

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
// @Description Admin get class
// @Tags Admin with class
// @Accept json
// @Produce json
// @Router /admin/student-class [get]
func AdminGetClass(w http.ResponseWriter, r *http.Request) {

	listClass, err := getdataClass.GetAllClass()

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data: model.DataRequest{
				ListClass: listClass,
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
// @Description Admin update class
// @Tags Admin with class
// @Accept json
// @Produce json
// @Param req body []model.Class false "list class need update" Format(model.Class)
// @Router /admin/student-class/update [put]
func AdminUpdateClass(w http.ResponseWriter, r *http.Request) {

	var listClass []model.Class
	json.NewDecoder(r.Body).Decode(&listClass)

	err := moduleAdminClass.AdminUpdateClass(listClass)

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
