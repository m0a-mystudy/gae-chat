package controllers

import (
	"fmt"

	"github.com/goadesign/goa"
	"github.com/m0a-mystudy/gae-chat/app"
	"github.com/m0a-mystudy/gae-chat/models"
)

// RoomController implements the room resource.
type RoomController struct {
	*goa.Controller
}

// ToRoomMedia is translater from models to apps
func ToRoomMedia(r *models.Room) *app.Room {
	return &app.Room{
		Name:        r.Name,
		Created:     r.Created,
		Description: r.Description,
	}
}

// ToRoomCollectionMedia is translater from models to apps
func ToRoomCollectionMedia(rs []*models.Room) *app.RoomCollection {
	res := app.RoomCollection{}
	for _, r := range rs {
		res = append(res, ToRoomMedia(r))
	}
	return &res
}

// NewRoomController creates a room controller.
func NewRoomController(service *goa.Service) *RoomController {
	return &RoomController{Controller: service.NewController("RoomController")}
}

// List runs the list action.
func (c *RoomController) List(ctx *app.ListRoomContext) error {

	IfNil := func(num *int, d int) int {
		if num != nil {
			return *num
		}
		return d
	}

	limit := IfNil(ctx.Limit, 100)
	offset := IfNil(ctx.Offset, 0)

	m := models.ContextModel(ctx)
	rooms, err := m.Rooms(offset, limit)
	if err != nil {
		goa.LogError(ctx, "msg", "error", err.Error())
		return ctx.NotFound()
	}

	// g.GetAll(datastore.NewQuery("Room"), &rooms)

	goa.LogInfo(ctx, "msg", "collection", fmt.Sprintf("%#v\n", rooms))
	res := ToRoomCollectionMedia(rooms)
	return ctx.OK(*res)

}

// Post runs the post action.
func (c *RoomController) Post(ctx *app.PostRoomContext) error {

	m := models.ContextModel(ctx)
	key, err := m.PostRoom(ctx.Payload.Name, ctx.Payload.Description)
	if err != nil {
		goa.LogError(ctx, "msg", "error", err.Error())
		return ctx.BadRequest(err)
	}
	goa.LogInfo(ctx, "msg", "key", key.String())

	return ctx.Created()
}

// Show runs the show action.
func (c *RoomController) Show(ctx *app.ShowRoomContext) error {

	m := models.ContextModel(ctx)
	room, err := m.Room(ctx.Name)

	if err != nil {
		return ctx.BadRequest(err)
	}
	return ctx.OK(ToRoomMedia(room))
}
