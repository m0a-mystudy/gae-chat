package design

import (
	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var JWT = JWTSecurity("jwt", func() {
	Header("Authorization")
	Scope("api:access", "API access") // Define "api:access" scope
})

var _ = API("GAE Chat API", func() {
	Title("goa study chat")
	Description("goa study chat api")
	Host("localhost:9089")
	Scheme("http")
	BasePath("/api")
	Origin("http://some.test.com:3000", func() {
		Methods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
		Headers("Origin", "X-Requested-With", "Content-Type", "Accept",
			"X-Csrftoken", "Authorization")
	})
	ResponseTemplate(Created, func(pattern string) {
		Description("Resource created")
		Status(201)
		Headers(func() {
			Header("Location", String, "href to created resource", func() {
				Pattern(pattern)
			})
		})
	})
})

var _ = Resource("room", func() {
	DefaultMedia(Room)
	BasePath("/rooms")
	Action("list", func() {
		Routing(GET(""))
		Description("Retrieve all rooms.")
		Params(func() {
			Param("limit", Integer)
			Param("offset", Integer)
		})
		Response(OK, CollectionOf(Room))
		Response(NotFound)
	})

	Action("show", func() {
		Routing(
			GET("/:name"),
		)
		Description("Retrieve room with given name")
		Params(func() {
			Param("name", String)
		})
		Response(OK)
		Response(NotFound)
		Response(BadRequest, ErrorMedia)
	})

	Action("post", func() {
		Routing(POST(""))
		Description("Create new Room")
		Payload(RoomPayload)
		Security(JWT, func() {
			Scope("api:access")
		})

		Response(Unauthorized)
		Response(Created, "/rooms/[0-9]+")
		Response(BadRequest, ErrorMedia)
	})
})

var _ = Resource("message", func() {
	DefaultMedia(Message)
	BasePath("messages")
	Parent("room")
	Action("list", func() {
		Routing(GET(""))
		Description("Retrieve all messages.")
		Params(func() {
			Param("nextCursor", String)
		})

		Response(OK, ResponseMessages)
		Response(NotFound)
	})
	Action("post", func() {
		Routing(POST(""))
		Description("Create new message")
		Security(JWT, func() {
			Scope("api:access")
		})

		Payload(MessagePayload)
		Response(Unauthorized)
		Response(Created, "^/rooms/[0-9]+/messages/[0-9]+$")
		Response(BadRequest)
	})

	Action("show", func() {
		Routing(
			GET("/:messageID"),
		)
		Description("Retrieve message with given id")
		Params(func() {
			Param("messageID", Integer)
		})
		Response(OK)
		Response(NotFound)
		Response(BadRequest, ErrorMedia)
	})

})

var _ = Resource("account", func() {
	DefaultMedia(Account)
	BasePath("accounts")

	Action("showMe", func() {
		Routing(
			GET("/me"),
		)
		Description("Retrieve my account")
		Security(JWT, func() {
			Scope("api:access")
		})

		Response(OK)
		Response(NotFound)
		Response(BadRequest, ErrorMedia)
	})

	Action("show", func() {
		Routing(
			GET(""),
		)
		Description("Retrieve account with given id or something")
		Params(func() {
			Param("ids", ArrayOf(String))
		})
		Response(OK, CollectionOf(Account))
		Response(NotFound)
		Response(BadRequest, ErrorMedia)
	})

})

var ResponseMessages = MediaType("application/vnd.response_messages+json", func() {
	Description("A ResponseMessage")
	Attributes(func() {
		Attribute("messages", CollectionOf(Message))
		Attribute("next", String)
		Required("messages", "next")
	})
	View("default", func() {
		Attribute("messages")
		Attribute("next")
	})
})

var Message = MediaType("application/vnd.message+json", func() {
	Description("A Message")
	Attributes(func() {
		Attribute("id", Integer)
		Attribute("content", String, func() {
			MinLength(1)
			MaxLength(400)
		})
		Attribute("auther", String)
		Attribute("created", DateTime)

		Required("id", "content", "auther", "created")
	})
	View("default", func() {
		Attribute("id")
		Attribute("auther")
		Attribute("content")
		Attribute("created")
	})
})
var MessagePayload = Type("MessagePayload", func() {
	Reference(Message)
	Attribute("content")
	Attribute("auther")
	Attribute("created")
	Required("content", "auther", "created")
})

var Room = MediaType("application/vnd.room+json", func() {
	Description("A room")
	Reference(RoomPayload)
	Attributes(func() {
		Attribute("name")
		Attribute("description")
		Attribute("created")
		Required("name", "description", "created")
	})

	View("default", func() {
		Attribute("name")
		Attribute("description")
		Attribute("created")
	})
})

var RoomPayload = Type("RoomPayload", func() {
	Attribute("name", String, "Name of room", func() {
		Example("room001")
		Pattern("[a-z|0-9]+")
		MinLength(3)
		MaxLength(20)

	})
	Attribute("description", String, "description of room", func() {
		Example("room description")
		MaxLength(400)
	})
	Attribute("created", DateTime, "Date of creation")
	Required("name", "description")
})

var Account = MediaType("application/vnd.account+json", func() {
	Description("A account")
	Attributes(func() {
		Attribute("googleUserID", String)
		Attribute("name", String)
		Attribute("picture", String)
		Attribute("lastLogin", DateTime)
		Required("googleUserID", "picture", "lastLogin")
	})

	View("default", func() {
		Attribute("googleUserID")
		Attribute("name")
		Attribute("picture")
		Attribute("lastLogin")
	})
})
