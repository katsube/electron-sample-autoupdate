const { app, dialog, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

// アップデートに関する情報をログファイルへ出力
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

// ウィンドウ管理用
let mainWin;

/**
 * ウィンドウを作成
 */
function createWindow () {
  const mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  mainWin.loadFile('index.html')
}

// Electronの準備が完了
app.whenReady().then(()=>{
  // ウィンドウを作成
  createWindow();

  // アップデートをチェック
  autoUpdater.checkForUpdatesAndNotify();
})

// ウィンドウがすべて閉じられたら
app.on('window-all-closed', () => {
  // macOS以外は終了
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// ウィンドウが0個の状態でアクティブになったら（macOS用）
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


//-------------------------------------------
// 自動アップデート関連のイベント処理
//-------------------------------------------
// アップデートをチェック開始
autoUpdater.on('checking-for-update', () => {
  log.info(process.pid, 'checking-for-update...');
})
// アップデートが見つかった
autoUpdater.on('update-available', (ev, info) => {
  log.info(process.pid, 'Update available.');
})
// アップデートがなかった（最新版だった）
autoUpdater.on('update-not-available', (ev, info) => {
  log.info(process.pid, 'Update not available.');
})
// アップデートのダウンロードが完了
autoUpdater.on('update-downloaded', (info) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['更新して再起動', 'あとで'],
    message: 'アップデート',
    detail: '新しいバージョンをダウンロードしました。再起動して更新を適用しますか？'
  }

  // ダイアログを表示しすぐに再起動するか確認
  dialog.showMessageBox(mainWin, dialogOpts).then((returnValue) => {
    if (returnValue.response === 0){
      autoUpdater.quitAndInstall()
    }
  })
});
// エラーが発生
autoUpdater.on('error', (err) => {
  log.error(process.pid, err);
})
