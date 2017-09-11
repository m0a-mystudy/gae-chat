package models

import "context"

var modelKey string

func WithModel(ctx context.Context, model ReadWriter) context.Context {
	return context.WithValue(ctx, &modelKey, model)
}

func ContextModel(ctx context.Context) ReadWriter {
	if t := ctx.Value(&modelKey); t != nil {
		return t.(ReadWriter)
	}
	return nil
}
