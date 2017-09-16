package controllers

import (
	"encoding/base64"

	"github.com/goadesign/goa"
	"github.com/m0a-mystudy/gae-chat/app"
	"github.com/m0a-mystudy/gae-chat/models"
)

// AccountController implements the account resource.
type AccountController struct {
	*goa.Controller
}

func ToAccountCollectionMedia(m []*models.Login) app.AccountCollection {
	res := app.AccountCollection{}
	for _, v := range m {
		res = append(res, ToAccountMedia(v))
	}
	return res
}

func ToAccountMedia(m *models.Login) *app.Account {
	picture := base64.StdEncoding.EncodeToString(m.Picture)
	return &app.Account{
		GoogleUserID: m.GoogleLoginID,
		Name:         &m.Name,
		Picture:      picture,
	}
}

// NewAccountController creates a account controller.
func NewAccountController(service *goa.Service) *AccountController {
	return &AccountController{Controller: service.NewController("AccountController")}
}

// ShowMe runs the show action.
func (c *AccountController) ShowMe(ctx *app.ShowMeAccountContext) error {
	m := models.ContextModel(ctx)
	res, err := m.LoginFromJWTContext(ctx)
	if err != nil {
		return ctx.BadRequest(err)
	}
	return ctx.OK(ToAccountMedia(res))
}

// Show runs the show action.
func (c *AccountController) Show(ctx *app.ShowAccountContext) error {
	m := models.ContextModel(ctx)
	// res := app.AccountCollection{}
	res := []*models.Login{}

	ids := ctx.Ids
	for _, googleID := range ids {
		l, err := m.Login(googleID)
		if err != nil {
			return ctx.BadRequest(err)
		}
		res = append(res, l)
	}

	return ctx.OK(ToAccountCollectionMedia(res))
}
