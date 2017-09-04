package controllers

import (
	"github.com/goadesign/goa"
	"github.com/m0a-mystudy/gae-chat/app"
)

// RoomController implements the room resource.
type RoomController struct {
	*goa.Controller
}

// NewRoomController creates a room controller.
func NewRoomController(service *goa.Service) *RoomController {
	return &RoomController{Controller: service.NewController("RoomController")}
}

// List runs the list action.
func (c *RoomController) List(ctx *app.ListRoomContext) error {
	// RoomController_List: start_implement

	// Put your logic here

	// RoomController_List: end_implement
	res := app.RoomCollection{}
	return ctx.OK(res)
}

// Post runs the post action.
func (c *RoomController) Post(ctx *app.PostRoomContext) error {
	// RoomController_Post: start_implement

	// Put your logic here

	// RoomController_Post: end_implement
	return nil
}

// Show runs the show action.
func (c *RoomController) Show(ctx *app.ShowRoomContext) error {
	// RoomController_Show: start_implement

	// Put your logic here

	// RoomController_Show: end_implement
	res := &app.Room{}
	return ctx.OK(res)
}
