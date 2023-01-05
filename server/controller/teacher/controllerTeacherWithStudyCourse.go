package teacher

import (
	"ctsv/model"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"

	getdataAttendance "ctsv/repository/getdata/attendance"
	getdataStudyScore "ctsv/repository/getdata/studyScore"
	moduleTeacher "ctsv/repository/module/teacher"
)

// @Summary
// @Description Teacher create studyScore and attendance
// @Tags Teacher with studyScore and attendance
// @Accept json
// @Produce json
// @Param course_code_id path string true "course_code_id"
// @Param req body []model.StudentBaseInfo false "List Base Info" Format(model.StudentBaseInfo)
// @Router /teacher/{course_code_id}/create_studyScore_attendance [post]
func TeacherCreateStudyScoreAndAttendance(w http.ResponseWriter, r *http.Request) {

	var listBaseInfo []model.StudentBaseInfo
	json.NewDecoder(r.Body).Decode(&listBaseInfo)

	courseCodeId, err := strconv.Atoi(chi.URLParam(r, "course_code_id"))

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {
		err := moduleTeacher.TeacherCreateStudyScoreAndttendance(listBaseInfo, courseCodeId)

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
}

// @Summary
// @Description Teacher get study score
// @Tags Teacher with studyScore and attendance
// @Accept json
// @Produce json
// @Param course_code_id path string true "Course Code Id"
// @Router /teacher/study_score/{course_code_id} [get]
func TeacherGetStudyScore(w http.ResponseWriter, r *http.Request) {

	courseCodeId, err := strconv.Atoi(chi.URLParam(r, "course_code_id"))

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {

		listStudyScore, err := getdataStudyScore.GetStudyScoreWithCourseCodeId(courseCodeId)

		if err != nil {
			statusrequest.ErrorRequest(w, r, err, "", "400")
		} else {
			result, _ := json.Marshal(model.Request{
				Data: model.DataRequest{
					ListStudyScore: listStudyScore,
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
// @Description Teacher update study score
// @Tags Teacher with studyScore and attendance
// @Accept json
// @Produce json
// @Param req body []model.StudyScore false "List study score" Format(model.StudyScore)
// @Router /teacher/study_score/update [put]
func TeacherUpdateStudyScore(w http.ResponseWriter, r *http.Request) {

	var listStudyScore []model.StudyScore
	json.NewDecoder(r.Body).Decode(&listStudyScore)

	err := moduleTeacher.TeacherUpdateStudyScore(listStudyScore)

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

// @Summary
// @Description Teacher get attendance
// @Tags Teacher with studyScore and attendance
// @Accept json
// @Produce json
// @Param course_code_id path string true "Course Code Id"
// @Router /teacher/attendance/{course_code_id} [GET]
func TeacherGetAttendace(w http.ResponseWriter, r *http.Request) {

	courseCodeId, err := strconv.Atoi(chi.URLParam(r, "course_code_id"))

	if err != nil {
		statusrequest.ErrorRequest(w, r, err, "", "400")
	} else {

		listAttendance, err := getdataAttendance.GetAttenddanceWithCourseCodeId(courseCodeId)

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
}

// @Summary
// @Description Teacher update attendance
// @Tags Teacher with studyScore and attendance
// @Accept json
// @Produce json
// @Param req body []model.Attendance false "List attendance" Format(model.Attendance)
// @Router /teacher/attendance/update [PUT]
func TeacherUpdateAttendance(w http.ResponseWriter, r *http.Request) {

	var listAttendance []model.Attendance
	json.NewDecoder(r.Body).Decode(&listAttendance)

	err := moduleTeacher.TeacherUpdateAttendance(listAttendance)

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
