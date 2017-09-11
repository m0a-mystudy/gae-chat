package controllers

import (
	"github.com/goadesign/goa"
	"github.com/m0a-mystudy/gae-chat/app"
	"github.com/m0a-mystudy/gae-chat/models"
)

// MessageController implements the message resource.
type MessageController struct {
	*goa.Controller
}

// ToMessageCollectionMedia is translater
func ToMessageCollectionMedia(m []*models.Message) *app.MessageCollection {
	// res := make(app.MessageCollection, len(m))
	// for _, v := range m {
	// 	res = append(res, ToMessageMedia(v))
	// }
	// return &res
	return nil
}

// ToMessageMedia is translater from models to app
func ToMessageMedia(m *models.Message) *app.Message {
	return &app.Message{
		ID:      int(m.ID),
		Auther:  m.Auther.String(),
		Content: m.Content,
		Created: m.Created,
	}
}

// NewMessageController creates a message controller.
func NewMessageController(service *goa.Service) *MessageController {
	return &MessageController{Controller: service.NewController("MessageController")}
}

// List runs the list action.
func (c *MessageController) List(ctx *app.ListMessageContext) error {
	// room := &models.Room{
	// 	Name: ctx.Name,
	// }
	// g := models.Goon(ctx)
	// query := datastore.NewQuery("Message").Ancestor(g.Key(room))

	// var res []*models.Message
	// g.GetAll(query, res)

	// // res := app.MessageWithAccountCollection{}
	// list := ToMessageCollectionMedia(res)
	// return ctx.OK(*list)
	return nil
}

// Post runs the post action.
func (c *MessageController) Post(ctx *app.PostMessageContext) error {
	// /ctx.Payload.
	return nil
}

// Show runs the show action.
func (c *MessageController) Show(ctx *app.ShowMessageContext) error {
	// MessageController_Show: start_implement

	// Put your logic here

	// MessageController_Show: end_implement
	res := &app.Message{}
	return ctx.OK(res)
}
