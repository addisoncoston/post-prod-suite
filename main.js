// Modules to control application life and create native browser window
// require('dotenv').config()
const {app, BrowserWindow, Menu} = require("electron");

let Sentry = require('@sentry/electron')
Sentry.init({ dsn: 'http://97cdbde87bb741fda5708a0ca96fdfbd@localhost:8000/1'})

const path = require('path');
const isDev = require('electron-is-dev');
// var helper = require('./index.js');
const { autoUpdater } = require('electron-updater');

const isMac = process.platform === 'darwin'



// if (require('electron-squirrel-startup')) return app.quit();

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 625,
    // frame: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
      nodeIntegration: true,
      webviewTag: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  // mainWindow.loadURL('https://mp.nflnaravato.nfl.net')

  mainWindow.setTitle('NFL Post Tools')
  autoUpdater.checkForUpdatesAndNotify()

  
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// const view = new BrowserView()
// mainWindow.setBrowserView(view)
// view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
// view.webContents.loadURL('https://electronjs.org')


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
    
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// exports.onClick = () => console.log('Yay');
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  //
  autoUpdater.quitAndInstall()
})


if (isDev) {
	console.log('Running in development');
} else {
	console.log('Running in production');
}


// const menu = Menu.buildFromTemplate([
//   {
//       label: 'Example',
//       submenu: [
//           {
//               label: 'About This App',
//               click: () =>
//                   openAboutWindow({
//                       icon_path: join(__dirname, 'icon.png'),
//                       copyright: 'Copyright (c) 2015 rhysd',
//                       package_json_dir: __dirname,
//                       open_devtools: process.env.NODE_ENV !== 'production',
//                   }),
//           },
//           {
//               label: 'About This App (custom version entry)',
//               click: () =>
//                   openAboutWindow({
//                       icon_path: join(__dirname, 'icon.png'),
//                       copyright: 'Copyright (c) 2015 rhysd',
//                       package_json_dir: __dirname,
//                       use_version_info: [
//                           ['my version entry 1', 'a.b.c'],
//                           ['my version entry 2', 'x.y.z'],
//                       ],
//                   }),
//           },
//           {
//               label: 'About This App (modal with close)',
//               click: () =>
//                   openAboutWindow({
//                       icon_path: join(__dirname, 'icon.png'),
//                       copyright: 'Copyright (c) 2015 rhysd',
//                       package_json_dir: __dirname,
//                       win_options: {
//                           parent: w,
//                           modal: true,
//                       },
//                       show_close_button: 'Close',
//                   }),
//           },
//           {
//               role: 'quit',
//           },
//       ],
//   },
// ]);
// app.applicationMenu = menu;