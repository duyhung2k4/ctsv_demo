package router

import (
	_ "ctsv/docs"
	"ctsv/middleware"
	"fmt"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/go-chi/jwtauth/v5"
	"github.com/joho/godotenv"
	httpSwagger "github.com/swaggo/http-swagger"

	adminAttendance "ctsv/controller/admin/attendance"
	adminClass "ctsv/controller/admin/classOfStudent"
	adminCourseCode "ctsv/controller/admin/courseCode"
	adminEnrollmentInformation "ctsv/controller/admin/enrollmentInformation"
	adminFamilyRelationship "ctsv/controller/admin/familyRelationship"
	adminGeneralInfomationStudent "ctsv/controller/admin/generalInformationStudent"
	adminStudyScore "ctsv/controller/admin/studyScore"

	controllerLogin "ctsv/controller/login"
	studentAttendance "ctsv/controller/student/attendance"
	studentEnrollmentInformation "ctsv/controller/student/enrollmentInformation"
	studentFamilyRealtionship "ctsv/controller/student/familyRelationship"
	studentGeneralInformation "ctsv/controller/student/generalInformation"
	studentStudyScore "ctsv/controller/student/studyScore"

	teacherAccount "ctsv/controller/admin/accountTeacher"
	teacherStudyScoreAndAttendance "ctsv/controller/teacher"
)

func Router() {

	err := godotenv.Load()

	if err != nil {
		fmt.Println(err)
	}

	tokenAuth := jwtauth.New("HS256", []byte("token"), nil)

	app := chi.NewRouter()

	cors := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	})
	app.Use(cors.Handler)

	app.Route("/login", func(r chi.Router) {

		r.Post("/admin", controllerLogin.AdminLogin)
		r.Post("/student", controllerLogin.StudentLogin)
		r.Post("/teacher", controllerLogin.TeacherLogin)
	})

	app.Route("/admin", func(r chi.Router) {

		r.Use(jwtauth.Verifier(tokenAuth))
		r.Use(jwtauth.Authenticator)
		r.Use(middleware.AuthorizationAdmin)

		r.Route("/teacher-account", func(r2 chi.Router) {
			r2.Post("/create", teacherAccount.AdminCreateAccountTeacher)
			r2.Get("/", teacherAccount.AdminGetAccountTeacher)
		})

		r.Route("/student-base-info", func(r2 chi.Router) {
			r2.Post("/create", adminGeneralInfomationStudent.AdminCreateBaseInfoOfStudent)
			r2.Get("/", adminGeneralInfomationStudent.AdminGetAllBaseInfoStudent)
			r2.Get("/{course}", adminGeneralInfomationStudent.AdminGetBaseInfoStudentOfCourse)
			r2.Get("/{course}/{department}", adminGeneralInfomationStudent.AminGetBaseInfoStudentInDepartmentOfCourse)
			r2.Put("/update", adminGeneralInfomationStudent.AdminUpdateBaseInfo)
		})

		//General Information Student
		r.Route("/student-overview", func(r2 chi.Router) {
			r2.Get("/", adminGeneralInfomationStudent.AdminGetOverViewStudent)
			r2.Put("/update", adminGeneralInfomationStudent.AdminUpdateOverViewStudent)
		})

		r.Route("/student-contact", func(r2 chi.Router) {
			r2.Get("/", adminGeneralInfomationStudent.AdminGetContactStudent)
			r2.Put("/update", adminGeneralInfomationStudent.AdminUpdateContact)
		})

		r.Route("/student-address", func(r2 chi.Router) {
			r2.Get("/", adminGeneralInfomationStudent.AdminGetAddress)
			r2.Put("/update", adminGeneralInfomationStudent.AdminUpdateAddress)
		})

		r.Route("/student-bank", func(r2 chi.Router) {
			r2.Get("/", adminGeneralInfomationStudent.AdminGetBank)
			r2.Put("/update", adminGeneralInfomationStudent.AdminUpdateBank)
		})

		//Family Realtionship

		r.Route("/student-parent", func(r2 chi.Router) {
			r2.Get("/{parent}", adminFamilyRelationship.AdminGetAllInfoParents)
			r2.Put("/update", adminFamilyRelationship.AdminUpdateParents)
		})

		r.Route("/student-siblings", func(r2 chi.Router) {
			r2.Get("/", adminFamilyRelationship.AdminGetSiBlings)
			r2.Put("/update", adminFamilyRelationship.AdminUpdateSiBlings)
		})

		// Enrollment Information

		r.Route("/student-granduation", func(r2 chi.Router) {
			r2.Get("/", adminEnrollmentInformation.AdminGetGranduationInformation)
			r2.Put("/update", adminEnrollmentInformation.AdminUpdateGranduationInformation)
		})

		r.Route("/student-resultsOfAnnouncement", func(r2 chi.Router) {
			r2.Get("/", adminEnrollmentInformation.AdminGetResultsOfAnnouncement)
			r2.Put("/update", adminEnrollmentInformation.AdminUpdateResultsOfAnnouncement)
		})

		// Study score

		r.Route("/student-studyScore", func(r2 chi.Router) {
			r2.Get("/{course_code}-{school_code}", adminStudyScore.AdminGetStudyScoreOfCourseCodeAndSchoolYear)
			r2.Get("/{class_code}-{course_code}-{school_code}", adminStudyScore.AdminGetStudyScoreOfClassCodeAndCourseCodeAndSchoolYear)
			r2.Post("/create", adminStudyScore.AdminCreateStudyScore)
			r2.Put("/update", adminStudyScore.AdminUpdateStudyScore)
		})

		// Attendance

		r.Route("/student-attendance", func(r2 chi.Router) {
			r2.Get("/", adminAttendance.AdminGetAttendanceWithSemesterAndClassCode)
			r2.Post("/create", adminAttendance.AdminCreateAttendance)
			r2.Put("/update", adminAttendance.AdminUpdateAttendance)
		})

		// Course code

		r.Route("/student-courseCode", func(r2 chi.Router) {
			r2.Get("/", adminCourseCode.AdminGetCourseCode)
			r2.Post("/create", adminCourseCode.AdminCreateCourseCode)
			r2.Put("/update", adminCourseCode.AdminUpdateCourseCode)
		})

		// Class

		r.Route("/student-class", func(r2 chi.Router) {
			r2.Get("/", adminClass.AdminGetClass)
			r2.Post("/create", adminClass.AdminCreateClass)
			r2.Put("/update", adminClass.AdminUpdateClass)
		})

		// Account student

		r.Route("/student-account", func(r2 chi.Router) {
			r2.Get("/", adminGeneralInfomationStudent.AdminGetAccountStudent)
			r2.Post("/create", adminGeneralInfomationStudent.AdminCreateAccountStudent)
		})

	})

	app.Route("/teacher", func(r chi.Router) {
		r.Use(jwtauth.Verifier(tokenAuth))
		r.Use(jwtauth.Authenticator)
		r.Use(middleware.AuthorizationTeacher)

		r.Get("/course_code", teacherStudyScoreAndAttendance.TeacherGetCourseCode)
		r.Post("/{course_code_id}/create_studyScore_attendance", teacherStudyScoreAndAttendance.TeacherCreateStudyScoreAndAttendance)

		r.Route("/study_score", func(r2 chi.Router) {
			r2.Get("/{course_code_id}", teacherStudyScoreAndAttendance.TeacherGetStudyScore)
			r2.Put("/update", teacherStudyScoreAndAttendance.TeacherUpdateStudyScore)
		})

		r.Route("/attendance", func(r2 chi.Router) {
			r2.Get("/{course_code_id}", teacherStudyScoreAndAttendance.TeacherGetAttendace)
			r2.Put("/update", teacherStudyScoreAndAttendance.TeacherUpdateAttendance)
		})
	})

	app.Route("/student", func(r chi.Router) {

		r.Use(jwtauth.Verifier(tokenAuth))
		r.Use(jwtauth.Authenticator)
		r.Use(middleware.AuthorizationStudent)

		// Student general information

		r.Route("/base_info", func(r2 chi.Router) {
			r2.Get("/", studentGeneralInformation.StudentGetBaseInfo)
		})

		r.Route("/overview", func(r2 chi.Router) {
			r2.Get("/", studentGeneralInformation.StudentGetOverview)
			r2.Put("/update", studentGeneralInformation.StudentUpdateOverView)
		})

		r.Route("/contact", func(r2 chi.Router) {
			r2.Get("/", studentGeneralInformation.StudentGetContact)
			r2.Put("/update", studentGeneralInformation.StudentUpdateContact)
		})

		r.Route("/address", func(r2 chi.Router) {
			r2.Get("/", studentGeneralInformation.StudentGetAddress)
			r2.Put("/update", studentGeneralInformation.StudentUpdateAddress)
		})

		r.Route("/bank", func(r2 chi.Router) {
			r2.Get("/", studentGeneralInformation.StudentGetBank)
			r2.Put("/update", studentGeneralInformation.StudentUpdateBank)
		})

		r.Route("/parents", func(r2 chi.Router) {
			r2.Get("/", studentFamilyRealtionship.StudentGetInfoParents)
			r2.Put("/update", studentFamilyRealtionship.StudentUpdateInfoParents)
		})

		r.Route("/siblings", func(r2 chi.Router) {
			r2.Get("/", studentFamilyRealtionship.StudentGetSiBlings)
			r2.Post("/create", studentFamilyRealtionship.StudentCreateSiBlings)
			r2.Delete("/delete", studentFamilyRealtionship.StudentDeleteSiBlings)
		})

		r.Route("/enrollment", func(r2 chi.Router) {
			r2.Get("/granduation_information", studentEnrollmentInformation.StudentGetGranduationInformation)
			r2.Get("/results_of_announcement", studentEnrollmentInformation.StudentGetResultsOfAnnouncement)
		})

		r.Route("/study_score", func(r2 chi.Router) {
			r2.Get("/", studentStudyScore.StudentGetStudyScore)
		})

		r.Route("/attendance", func(r2 chi.Router) {
			r2.Get("/", studentAttendance.StudentGetAttendance)
		})

	})

	app.Get("/swagger/*", httpSwagger.Handler(
		httpSwagger.URL("http://localhost:3000/swagger/doc.json"),
	))

	port := fmt.Sprintf(":%s", os.Getenv("PORT"))

	http.ListenAndServe(port, app)
}
