# App Engine Example GAE chat

goaをベースとしてGAE/go向けのchatアプリを作成

*注意点* : go.1.8環境で作っています。作った時点ではまだbeta環境です


## 動かし方

### 必要なもの

* AppEngine Go SDK

macでのインストール手順

```
$ brew install app-engine-go-64
```

もしくは[instructions](https://cloud.google.com/appengine/docs/standard/go/download) を参照


deploy手順は
[documentation](https://cloud.google.com/appengine/docs/standard/go/) 
を参照


### Running Locally

```
$ make devserver
$ make devclient
```

devclient側てproxy経由でアクセスすることで開きます  
http://some.test.com:3000/ にアクセスして下さい

``some.test.com`` が嫌なら以下を修正して下さい

* server/chat-client/package.json

```json:server/chat-client/package.json
"start": "HOST=some.test.com  react-scripts-ts start", <--変更
```


### Deploying

以下の ``projectName`` を自作のものに変更して下さい

```
GAE_PROJECT:=projectName <- change
```

以下を叩いて実行

```bash
make deploy
```


### Updating the DSL

省略
Makefileを参照
