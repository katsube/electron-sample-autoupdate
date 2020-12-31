# Electron Sample - 自動アップデート
electron-builderの機能を利用し、新しいバージョンがあれば自動的にダウンロードし更新する処理を導入します。

1. electron-builderの機能を使う
1. ビルドしたアプリはAWS S3へアップ
1. 更新があるとユーザーの確認無しでダウンロード

## 解説ページ
* [[Electron] 自動アップデートに対応する – autoUpdater](https://blog.katsubemakito.net/nodejs/electron/autoupdater)

## 重要
このリポジトリには環境変数の設定を行うための「.env」を登録していますが、実際に開発する場合には **絶対に含めない** でください。

## 準備
### AWS
解説ページの内容を参考に、S3の新しいバケットとIAMを作成してください。
### ローカル環境
Gitでリポジトリを取得します。
```shellsession
$ git clone https://github.com/katsube/electron-sample-autoupdate.git
```

Node.jsがインストールされている環境で以下のコマンドを実行し、必要なライブラリを取得します。
```shellsession
$ cd electron-sample-autoupdate
$ npm install
```
## 実行方法
以下でプレビューを行います。
```shellsession
$ npm start
```

以下のビルド用コマンドを叩くと、各OS用のインストーラーが作成されます。
```shellsession
$ npm run build-win
$ npm run build-mac
```

以下のコマンドでビルドした後に自動的にS3へアップロードしてくれます。
```shellsession
$ npm run build-win-publish
$ npm run build-mac-publish
```
