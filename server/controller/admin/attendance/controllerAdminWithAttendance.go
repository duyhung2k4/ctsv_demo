package attendance

import (
	"ctsv/model"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"

	getdataAttendance "ctsv/repository/getdata/attendance"
	moduleAdminAttendance "ctsv/repository/module/admin/attendance"

	"github.com/go-chi/chi/v5"
)

// @Summary
// @Description Admin create attendance student
// @Tags Admin with attendance
// @Accept json
// @Produce json
// @Param req body []model.Attendance false "List attendance" Format(model.Attendance)
// @Router /admin/student-attendance/create [post]
func AdminCreateAttendance(w http.ResponseWriter, r *http.Request) {

	var attendance []model.Attendance
	json.NewDecoder(r.Body).Decode(&attendance)

	err := moduleAdminAttendance.AdminCreateAttendance(attendance)

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
// @Description Admin get attendance
// @Tags Admin with attendance
// @Accept json
// @Produce json
// @Param semester path string true "semester"
// @Param class_code path string true "class code"
// @Router /admin/student-attendance/{semester}-{class_code} [get]
func AdminGetAttendanceWithSemesterAndClassCode(w http.ResponseWriter, r *http.Request) {

	semester := chi.URLParam(r, "semester")
	classCode := chi.URLParam(r, "class_code")

	listAttendance, err := getdataAttendance.GetAttendance(semester, classCode)

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		result, _ := json.Marshal(model.Request{
			Data: model.DataRequest{
				ListAttendance: listAttendance,
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
// @Description Admin update attendance
// @Tags Admin with attendance
// @Accept json
// @Produce json
// @Param req body []model.Attendance false "List attendance need update" Format(model.Attendance)
// @Router /admin/student-attendance/update [put]
func AdminUpdateAttendance(w http.ResponseWriter, r *http.Request) {

	var listAttendance []model.Attendance
	json.NewDecoder(r.Body).Decode(&listAttendance)

	err := moduleAdminAttendance.AdminUpdateAttendance(listAttendance)

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
