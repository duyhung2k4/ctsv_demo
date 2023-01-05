package middleware

import (
	"ctsv/statusrequest"
	"net/http"

	"github.com/go-chi/jwtauth/v5"
)

func AuthorizationTeacher(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, claims, err := jwtauth.FromContext(r.Context())

		if err != nil {
			statusrequest.ErrorRequest(w, r, err, "", "400")
		} else {
			if claims["permission"] == "teacher" {
				next.ServeHTTP(w, r)
			} else {
				statusrequest.ErrorRequest(w, r, err, "Not is teacher", "400")
			}
		}
	})
}
