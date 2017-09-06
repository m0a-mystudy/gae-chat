package controllers

import (
	"fmt"

	"google.golang.org/appengine/datastore"

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
func ToRoomCollectionMedia(rs *[]models.Room) *app.RoomCollection {
	res := make(app.RoomCollection, len(*rs))
	for _, r := range *rs {
		res = append(res, ToRoomMedia(&r))
	}
	return &res
}

// NewRoomController creates a room controller.
func NewRoomController(service *goa.Service) *RoomController {
	return &RoomController{Controller: service.NewController("RoomController")}
}

// List runs the list action.
func (c *RoomController) List(ctx *app.ListRoomContext) error {
	g := models.Goon(ctx)
	rooms := []models.Room{}
	g.GetAll(datastore.NewQuery("Room"), &rooms)

	res := ToRoomCollectionMedia(&rooms)
	return ctx.OK(*res)
}

// Post runs the post action.
func (c *RoomController) Post(ctx *app.PostRoomContext) error {

	room := &models.Room{
		Name: ctx.Payload.Name,
	}

	g := models.Goon(ctx)

	err := g.Get(room)
	if err == nil {
		return ctx.BadRequest(fmt.Errorf("already exist Room %s", room.Name))
	}

	room = &models.Room{
		Name:        ctx.Payload.Name,
		Created:     *ctx.Payload.Created,
		Description: ctx.Payload.Description,
	}
	_, err = g.Put(room)
	if err != nil {
		return ctx.BadRequest(err)
	}

	return ctx.Created()
}

// Show runs the show action.
func (c *RoomController) Show(ctx *app.ShowRoomContext) error {

	room := &models.Room{Name: ctx.Name}
	g := models.Goon(ctx)
	err := g.Get(room)
	if err != nil {
		return ctx.BadRequest(err)
	}
	return ctx.OK(ToRoomMedia(room))
}
