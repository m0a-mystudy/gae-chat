package server

import (
	"context"
	"fmt"
	"io/ioutil"
	"os"
	"time"

	"github.com/m0a-mystudy/gae-chat/models"
	"github.com/mjibson/goon"

	"google.golang.org/appengine/urlfetch"

	jwt "github.com/dgrijalva/jwt-go"
	oauth2 "google.golang.org/api/oauth2/v2"

	"github.com/m0a/goagooglelogin"
)

// CreateClaims main logic
var CreateClaims goagooglelogin.CreateClaimFunction = func(
	googleUserID string,
	userinfo *oauth2.Userinfoplus,
	tokenInfo *oauth2.Tokeninfo,
	ctx context.Context,
) (jwt.Claims, error) {

	client := urlfetch.Client(ctx)
	resp, err := client.Get(userinfo.Picture)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()
	picture, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	// sample save code
	login := &models.Login{
		GoogleLoginID: googleUserID,
	}

	g := goon.FromContext(ctx)
	err = g.Get(login)
	if err != nil {
		newLogin := &models.Login{
			GoogleLoginID: googleUserID,
			Email:         userinfo.Email,
			Name:          userinfo.Name,
			LastLogin:     time.Now(),
			Picture:       picture,
		}
		key, err := g.Put(newLogin)
		if err != nil {
			return nil, err
		}
		fmt.Println("key is ", key)

	}

	return goagooglelogin.MakeClaim("api:access", googleUserID, 10), nil
}

// GoogleLoginConf is google login config
var GoogleLoginConf = goagooglelogin.GoaGloginConf{
	LoginURL:           "/login",
	CallbackURL:        "/oauth2callback",
	StateSigned:        "xs23234sss3333",
	LoginSigned:        "asdas3das24ss3",
	GoogleClientID:     os.Getenv("OPENID_GOOGLE_CLIENT"),
	GoogleClientSecret: os.Getenv("OPENID_GOOGLE_SECRET"),
	CreateClaims:       CreateClaims,
	ExtensionIDs:       []string{},
}
