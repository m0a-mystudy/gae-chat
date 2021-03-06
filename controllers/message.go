package controllers

import (
	jwtgo "github.com/dgrijalva/jwt-go"
	"github.com/goadesign/goa"
	"github.com/goadesign/goa/middleware/security/jwt"
	"github.com/m0a-mystudy/gae-chat/app"
	"github.com/m0a-mystudy/gae-chat/models"
)

// MessageController implements the message resource.
type MessageController struct {
	*goa.Controller
}

// NewMessageController creates a message controller.
func NewMessageController(service *goa.Service) *MessageController {
	return &MessageController{Controller: service.NewController("MessageController")}
}

// List runs the list action.
func (c *MessageController) List(ctx *app.ListMessageContext) error {
	m := models.ContextModel(ctx)
	mes, nextCursor, err := m.MessagesByCursor(ctx.Name, ctx.NextCursor)
	if err != nil {
		goa.LogError(ctx, "msg", "error", err.Error())
		return ctx.NotFound()
	}

	response := &app.ResponseMessages{
		Messages: *m.ToMessageCollectionMedia(mes),
		Next:     *nextCursor,
	}
	return ctx.OK(response)

}

// Post runs the post action.
func (c *MessageController) Post(ctx *app.PostMessageContext) error {
	m := models.ContextModel(ctx)
	jwtContext := jwt.ContextJWT(ctx)
	claims, ok := jwtContext.Claims.(jwtgo.MapClaims)
	if !ok {
		return ctx.Unauthorized()
	}
	googleID, ok := claims["sub"].(string)
	if !ok {
		return ctx.Unauthorized()
	}

	// TODO set google userID
	m.PostMessage(ctx.Name, googleID, ctx.Payload.Content)
	return ctx.Created()
}

// Show runs the show action.
func (c *MessageController) Show(ctx *app.ShowMessageContext) error {
	m := models.ContextModel(ctx)
	mes, err := m.Message(ctx.Name, int64(ctx.MessageID))
	if err != nil {
		goa.LogError(ctx, "msg", "error", err.Error())
		return ctx.NotFound()
	}
	return ctx.OK(m.ToMessageMedia(mes))
}
