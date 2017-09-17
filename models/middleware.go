package models

import (
	"context"
	"net/http"

	"github.com/goadesign/goa"
)

var modelKey string

// withModel modelをcontextに登録する
func withModel(ctx context.Context, model LoadSaver) context.Context {
	return context.WithValue(ctx, &modelKey, model)
}

// ContextModel modelをcontextから取り出す
func ContextModel(ctx context.Context) LoadSaver {
	if t := ctx.Value(&modelKey); t != nil {
		return t.(LoadSaver)
	}
	return nil
}

// Middleware contextに対する登録処理
func Middleware(setModelHandler func(ctx context.Context) LoadSaver) goa.Middleware {
	return func(h goa.Handler) goa.Handler {
		return func(ctx context.Context, rw http.ResponseWriter, req *http.Request) error {

			newCtx := withModel(ctx, setModelHandler(ctx))
			return h(newCtx, rw, req)
		}
	}
}
