package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {
            "name": "Big O"
        },
        "license": {
            "name": "MIT"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/providers": {
            "get": {
                "description": "fetch every provider available.",
                "consumes": [
                    "*/*"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "providers"
                ],
                "summary": "Get all providers.",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/providers.providerDB"
                            }
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "providers.providerDB": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "string"
                },
                "address": {
                    "type": "string"
                },
                "id": {
                    "type": "int"
                },
                "location": {
                    "type": "array",
                    "items": {
                      "type": "number"
                    }
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "2.0",
	Host:             "",
	BasePath:         "/",
	Schemes:          []string{},
	Title:            "TranscendCare Provider service",
	Description:      "API documentation",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
