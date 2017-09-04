// +build appengine

package server

import (
	"net/http"

	"github.com/goadesign/goa"
	"github.com/goadesign/goa/middleware"
	"github.com/m0a-mystudy/gae-chat/app"
	"github.com/m0a-mystudy/gae-chat/controllers"
	"github.com/m0a-mystudy/gae-chat/login"
	"github.com/m0a/goagooglelogin"
)

func init() {
	// Create service
	service := goa.New("appengine")

	// Mount middleware
	service.Use(login.LoginMiddleWare(&GoogleLoginConf))
	service.Use(middleware.RequestID())
	service.Use(middleware.LogRequest(true))
	service.Use(middleware.ErrorHandler(service, true))
	service.Use(middleware.Recover())
	// google login
	service.Use(goagooglelogin.WithConfig(service, &GoogleLoginConf))
	app.UseJWTMiddleware(service, goagooglelogin.NewJWTMiddleware(&GoogleLoginConf, app.NewJWTSecurity()))

	// Mount "hello" controller
	// c := controller.NewHelloController(service)
	// app.MountHelloController(service, c)
	// Mount "message" controller
	c := controllers.NewMessageController(service)
	app.MountMessageController(service, c)
	// Mount "room" controller
	c2 := controllers.NewRoomController(service)
	app.MountRoomController(service, c2)

	// Setup HTTP handler
	http.HandleFunc("/", service.Mux.ServeHTTP)
}
