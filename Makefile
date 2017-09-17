#! /usr/bin/make
#
# Makefile for gae-chat in appengine
#
# This command makes necessary changes to use with GAE / Go.
# Also, please be sure to vendoring If you use this command.
#

.DEFAULT_GOAL := help

##### Example ######

example: depend bootstrap delete 

# delete:
# 	rm -f ./hello.go
# 	rm -f ./main.go

##### Convenience targets ######

REPO:=github.com/m0a-mystudy/gae-chat
GAE_PROJECT:=gaechatx
PORT:=9089
CLIENTAPI:=gae-chat-client-api

## run bootstrap 
init:  bootstrap 
## run clean generate codegen 
gen: clean generate codegen

# depend:
# 	@which glide || go get -v github.com/Masterminds/glide
# 	@glide install

## generete bootstrap
bootstrap:
	@goagen bootstrap -d $(REPO)/design

## generete main code
main:
	@goagen main -d $(REPO)/design

## delete generete file
clean:
	@rm -rf app
	@rm -rf client
	@rm -rf tool
	@rm -rf swagger

## generete app,swagger, controler
generate:
	@goagen app     -d $(REPO)/design
	@goagen swagger -d $(REPO)/design
	@goagen controller --pkg controllers -d $(REPO)/design -o controllers

## js client code genereter 
codegen: 
	@swagger-codegen generate -l typescript-fetch  -i ./swagger/swagger.json  -o ./$(CLIENTAPI)
	@jq -s '.[0] * .[1]' $(CLIENTAPI)/package.json $(CLIENTAPI)/package_replace.json > replaced_package.json
	@rm $(CLIENTAPI)/package.json
	@mv replaced_package.json $(CLIENTAPI)/package.json
	cd $(CLIENTAPI) && npm link

## run deploy
deploy:
	goapp deploy -application $(GAE_PROJECT) -version 1 ./server

## run rollback
rollback:
	appcfg.py rollback ./server -A $(GAE_PROJECT)

## Run dev server
devserver:
	goapp serve -port $(PORT) ./server

## Run dev client proxy
devclient:
	@cd server/chat-client; yarn start

## Run tests
test:
	@cd server; goapp test -v $(REPO)/models

## Show help
help:
	@make2help $(MAKEFILE_LIST)

.PHONY: test deps help