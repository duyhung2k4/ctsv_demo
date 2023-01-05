package middleware

import (
	"ctsv/statusrequest"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/jwtauth/v5"
	"github.com/go-chi/render"
)

func AuthorizationStudent(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		_, claims, err := jwtauth.FromContext(r.Context())

		if err != nil {
			tokenError(w, r, err)
		} else {
			if claims["permission"] == "student" {
				next.ServeHTTP(w, r)
			} else {
				fmt.Println("Error")
				result, _ := json.Marshal(statusrequest.TypeRequest{
					Error:   nil,
					Message: "Not is student",
					Status:  "400",
				})

				render.JSON(w, r, result)
			}
		}

	})
}
