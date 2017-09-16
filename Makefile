#! /usr/bin/make
#
# Makefile for goa examples in appengine
#
# Targets:
# - appengine
# This command makes necessary changes to use with GAE / Go.
# Also, please be sure to vendoring If you use this command.
#

##### Example ######

example: depend bootstrap delete 

delete:
	rm -f ./hello.go
	rm -f ./main.go

##### Convenience targets ######

REPO:=github.com/m0a-mystudy/gae-chat
GAE_PROJECT:=gaechatx
PORT:=9089
CLIENTAPI:=gae-chat-client-api

init:  bootstrap 
gen: clean generate codegen

# depend:
# 	@which glide || go get -v github.com/Masterminds/glide
# 	@glide install


bootstrap:
	@goagen bootstrap -d $(REPO)/design

main:
	@goagen main -d $(REPO)/design

clean:
	@rm -rf app
	@rm -rf client
	@rm -rf tool
	@rm -rf swagger

generate:
	@goagen app     -d $(REPO)/design
	@goagen swagger -d $(REPO)/design
	@goagen controller --pkg controllers -d $(REPO)/design -o controllers

codegen: 
	@swagger-codegen generate -l typescript-fetch  -i ./swagger/swagger.json  -o ./$(CLIENTAPI)
	@jq -s '.[0] * .[1]' $(CLIENTAPI)/package.json $(CLIENTAPI)/package_replace.json > replaced_package.json
	@rm $(CLIENTAPI)/package.json
	@mv replaced_package.json $(CLIENTAPI)/package.json
	cd $(CLIENTAPI) && npm link

deploy:
	goapp deploy -application $(GAE_PROJECT) ./server

rollback:
	appcfg.py rollback ./server -A $(GAE_PROJECT)

local:
	goapp serve -port $(PORT) ./server

test:
	@cd server; goapp test -v $(REPO)/models
