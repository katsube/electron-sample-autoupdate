# Electron Sample - 自動アップデート

## 解説ページ
* [[Electron] 自動アップデートに対応する – autoUpdater](https://blog.katsubemakito.net/nodejs/electron/autoupdater)

## 準備
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
