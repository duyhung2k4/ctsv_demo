package coursecode

import (
	"ctsv/model"
	getdataCourseCode "ctsv/repository/getdata/courseCode"
	moduleAdminCourseCode "ctsv/repository/module/admin/courseCode"
	"ctsv/statusrequest"
	"encoding/json"
	"fmt"
	"net/http"
)

// @Summary
// @Description Admin create course code
// @Tags Admin with course code
// @Accept json
// @Produce json
// @Param req body []model.CourseCode false "Course code" Format(model.CourseCode)
// @Router /admin/student-courseCode/create [post]
func AdminCreateCourseCode(w http.ResponseWriter, r *http.Request) {

	var listCourseCode []model.CourseCode
	json.NewDecoder(r.Body).Decode(&listCourseCode)

	fmt.Println(listCourseCode)

	err := moduleAdminCourseCode.AdminCreateCourseCode(listCourseCode)

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
// @Description Admin get course code
// @Tags Admin with course code
// @Accept json
// @Produce json
// @Router /admin/student-courseCode [get]
func AdminGetCourseCode(w http.ResponseWriter, r *http.Request) {

	listCourseCode, err := getdataCourseCode.GetAllCourseCode()

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data: model.DataRequest{
				ListCourseCode: listCourseCode,
			},
			Message: "",
			Error:   nil,
			Success: true,
		})

		w.WriteHeader(http.StatusOK)
		w.Write(result)
	}
}

// @Summray
// @Description Admin update course code
// @Tags Admin with course code
// @Accept json
// @Produce json
// @Param req body []model.CourseCode false "List course need update" Format(model.CourseCode)
// @Router /admin/student-courseCode/update [put]
func AdminUpdateCourseCode(w http.ResponseWriter, r *http.Request) {

	var listCourseCode []model.CourseCode
	json.NewDecoder(r.Body).Decode(&listCourseCode)

	err := moduleAdminCourseCode.AdminUpdateCourseCode(listCourseCode)

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data:    nil,
			Message: "Updated Successfully",
			Error:   nil,
			Success: true,
		})

		w.WriteHeader(http.StatusOK)
		w.Write(result)
	}
}
