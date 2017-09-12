package models

import (
	"context"
	"net/http"

	"github.com/goadesign/goa"
)

var modelKey string

func WithModel(ctx context.Context, model LoadSaver) context.Context {
	return context.WithValue(ctx, &modelKey, model)
}

func ContextModel(ctx context.Context) LoadSaver {
	if t := ctx.Value(&modelKey); t != nil {
		return t.(LoadSaver)
	}
	return nil
}

func Middleware(setModelHandler func(ctx context.Context) LoadSaver) goa.Middleware {
	return func(h goa.Handler) goa.Handler {
		return func(ctx context.Context, rw http.ResponseWriter, req *http.Request) error {

			newCtx := WithModel(ctx, setModelHandler(ctx))
			return h(newCtx, rw, req)
		}
	}
}
