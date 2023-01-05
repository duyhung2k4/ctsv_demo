package getelement

import (
	"ctsv/model"
	"ctsv/repository/getdata"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"
)

// @Summary
// @Desceription get course
// @Tags Element
// @Accept json
// @Produce json
// @Router /element/courses [get]
func GetElementCourse(w http.ResponseWriter, r *http.Request) {

	courses, err := getdata.GetElementCourse()

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data: model.DataRequest{
				Courses: courses,
			},
			Error:   nil,
			Message: "",
			Success: true,
		})

		w.WriteHeader(http.StatusOK)
		w.Write(result)
	}
}

// @Summary
// @Description get department
// @Tags Element
// @Accept json
// @Produce json
// @Router /element/department [get]
func GetElementDepartment(w http.ResponseWriter, r *http.Request) {

	depathments, err := getdata.GetElementDepartment()

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data: model.DataRequest{
				Departments: depathments,
			},
			Error:   nil,
			Message: "",
			Success: true,
		})

		w.WriteHeader(http.StatusOK)
		w.Write(result)
	}
}
