package studyscore

import (
	"ctsv/model"
	getdataStudyScore "ctsv/repository/getdata/studyScore"
	moduleStudyScore "ctsv/repository/module/admin/studyScore"
	"ctsv/statusrequest"
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
)

// @Summary
// @Description Admin create study score
// @Tags Admin with study score
// @Accept json
// @Produce json
// @Param req body []model.StudyScore false "list study score" Format(model.StudyScore)
// @Router /admin/student-studyScore/create [post]
func AdminCreateStudyScore(w http.ResponseWriter, r *http.Request) {

	var listStudyScore []model.StudyScore
	json.NewDecoder(r.Body).Decode(&listStudyScore)

	err := moduleStudyScore.AdminCreateStudyScore(listStudyScore)

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
// @Description Admin get study score of course code and school year
// @Tags Admin with study score
// @Accept json
// @Produce json
// @Param course_code path string true "course code"
// @Param school_year path string true "school year"
// @Router /admin/student-studyScore/{course_code}-{school_year} [get]
func AdminGetStudyScoreOfCourseCodeAndSchoolYear(w http.ResponseWriter, r *http.Request) {

	courseCode := chi.URLParam(r, "course_code")
	schoolYear := chi.URLParam(r, "school_year")

	listStudyScore, err := getdataStudyScore.GetStudyScoreOfCourseCodeAndShoolYear(courseCode, schoolYear)

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

// @Summary
// @Description Admin get study score of class code and course code and school year
// @Tags Admin with study score
// @Accept json
// @Produce json
// @Param class_code path string true "class code"
// @Param course_code path string true "course code"
// @Param school_code path string true "school code"
// @Router /admin/student-studyScore/{class_code}-{course_code}-{school_year} [get]
func AdminGetStudyScoreOfClassCodeAndCourseCodeAndSchoolYear(w http.ResponseWriter, r *http.Request) {

	classCode := chi.URLParam(r, "class_code")
	courseCode := chi.URLParam(r, "course_code")
	schoolYear := chi.URLParam(r, "school_year")

	listStudyScore, err := getdataStudyScore.GetStudyScoreOfClassInCourseCodeAndSchoolYear(classCode, courseCode, schoolYear)

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

// @Summary
// @Description Admin update study score
// @Tags Admin with study score
// @Accept json
// @Produce json
// @Param req body []model.StudyScore false "List study score need update" Format(model.StudyScore)
// @Router /admin/student-studyScore/update [put]
func AdminUpdateStudyScore(w http.ResponseWriter, r *http.Request) {

	var listStudyScore []model.StudyScore
	json.NewDecoder(r.Body).Decode(&listStudyScore)

	err := moduleStudyScore.AdminUpdateStudyScore(listStudyScore)

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
