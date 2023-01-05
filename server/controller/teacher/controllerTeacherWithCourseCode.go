package teacher

import (
	"ctsv/model"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"
	"strconv"

	getCourseCode "ctsv/repository/getdata/courseCode"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"
)

// @Summary
// @Description Teacher get all course code
// @Tags Teacher with course code
// @Accept json
// @Produce json
// @Router /teacher/course_code [get]
func TeacherGetCourseCode(w http.ResponseWriter, r *http.Request) {

	_, claims, err := jwtauth.FromContext(r.Context())

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "Error token", "400")
	} else {
		teacherId := int(claims["id"].(float64))
		listCourseCode, err := getCourseCode.GetCourseCodeOfTeacher(teacherId)

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
}

// @Summary
// @Depcription Teacher get courseCode by id
// @Tags Teacher with course code
// @Accept json
// @Produce json
// @Param course_code_id path string true "Course  Code Id"
// @Router /teacher/course_code/{course_code_id} [get]
func TeacherGetCourseCodeById(w http.ResponseWriter, r *http.Request) {

	courseId, err1 := strconv.Atoi(chi.URLParam(r, "course_code_id"))
	_, claims, err2 := jwtauth.FromContext(r.Context())

	if err1 != nil {
		statusrequest.ErrorRequest(w, r, err1, "Error course id", "400")
	} else if err2 != nil {
		statusrequest.ErrorRequest(w, r, err2, "Error token", "400")
	} else {
		teacherId := int(claims["id"].(float64))
		courseCode, err := getCourseCode.GetCourseCodeOfId(courseId, teacherId)

		if err != nil {
			statusrequest.ErrorRequest(w, r, err, "", "400")
		} else {
			result, _ := json.Marshal(model.Request{
				Data: model.DataRequest{
					CourseCode: courseCode,
				},
				Message: "",
				Error:   nil,
				Success: true,
			})

			w.WriteHeader(http.StatusOK)
			w.Write(result)
		}
	}
}
