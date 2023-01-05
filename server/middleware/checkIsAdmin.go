package middleware

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/jwtauth/v5"
	"github.com/go-chi/render"
)

func AuthorizationAdmin(next http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		_, claims, err := jwtauth.FromContext(r.Context())

		if err != nil {
			tokenError(w, r, err)
		} else {
			if claims["permission"] == "admin" {
				next.ServeHTTP(w, r)
			} else {
				result, _ := json.Marshal(map[string]interface{}{
					"Error":   nil,
					"Message": "Not is admin",
					"Success": false,
				})

				render.JSON(w, r, result)
			}
		}
	})
}
