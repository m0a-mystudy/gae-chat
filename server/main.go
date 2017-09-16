// +build appengine

package server

import (
	"context"
	"net/http"

	"github.com/m0a/goagooglelogin"

	"github.com/m0a-mystudy/gae-chat/models"

	"github.com/goadesign/goa"
	"github.com/goadesign/goa/middleware"
	"github.com/m0a-mystudy/gae-chat/app"
	"github.com/m0a-mystudy/gae-chat/controllers"
)

func init() {
	// Create service
	service := goa.New("appengine")

	// Mount middleware
	service.Use(middleware.RequestID())
	service.Use(middleware.LogRequest(true))
	service.Use(middleware.ErrorHandler(service, true))
	service.Use(middleware.Recover())
	service.Use(models.Middleware(func(ctx context.Context) models.LoadSaver {
		return models.New(ctx)
	}))

	app.UseJWTMiddleware(service, goagooglelogin.NewJWTMiddleware(&GoogleLoginConf, app.NewJWTSecurity()))
	goagooglelogin.MountControllerWithConfig(service, &GoogleLoginConf)

	// Mount "message" controller
	c := controllers.NewMessageController(service)
	app.MountMessageController(service, c)

	// Mount "room" controller
	c2 := controllers.NewRoomController(service)
	app.MountRoomController(service, c2)

	c3 := controllers.NewAccountController(service)
	app.MountAccountController(service, c3)

	// Setup HTTP handler
	http.HandleFunc("/", service.Mux.ServeHTTP)
}
