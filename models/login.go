package models

import (
	"context"
	"fmt"
	"time"

	jwtgo "github.com/dgrijalva/jwt-go"
	"github.com/goadesign/goa/middleware/security/jwt"
	"google.golang.org/appengine/datastore"
)

// Login はユーザ情報を管理します
type Login struct {
	GoogleLoginID string `datastore:"-" goon:"id"`
	Picture       []byte
	Name          string
	Email         string
	LastLogin     time.Time
}

// Login googleUserIDから Login型の取得
func (m *Model) Login(googleUserID string) (*Login, error) {
	login := &Login{
		GoogleLoginID: googleUserID,
	}
	err := m.Get(login)
	if err != nil {
		return nil, err
	}
	return login, nil
}

// LoginFromJWTContext JWTからLoginを取得する。 自分の情報の取得
func (m *Model) LoginFromJWTContext(ctx context.Context) (*Login, error) {
	token := jwt.ContextJWT(ctx)
	if token == nil {
		return nil, fmt.Errorf("JWT token is missing from context") // internal error
	}

	claims := token.Claims.(jwtgo.MapClaims)

	googleID, ok := claims["sub"].(string)
	if !ok {
		return nil, fmt.Errorf("JWT token['sub'] is missing from context") // internal error
	}

	return m.Login(googleID)
}

// PostLogin Loginの作成
func (m *Model) PostLogin(googleUserID, email, name string, picture []byte) (*datastore.Key, error) {

	newLogin := &Login{
		GoogleLoginID: googleUserID,
		Email:         email,
		Name:          name,
		LastLogin:     time.Now(),
		Picture:       picture,
	}
	key, err := m.Put(newLogin)
	if err != nil {
		return nil, err
	}
	return key, nil
}
