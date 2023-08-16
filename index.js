const {getVideos} = require("./Services/notion")
const express= require('express')
const {newRoute, routes} = require("express-quickrouter")
const {authenticate} = require("./Services/Routes/middleware")
const rts = require('./Services/Routes/routes');
const path = require("path");
const server = express();
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './public/preload.js')
    }
  })

  win.loadFile('./public/index.html')
}
app.whenReady().then(() => {
  createWindow()
});
require('dotenv').config();
server.use(express.static(path.resolve('./public')))
for (let i = 0; i < rts.r.length; i++) {
    server.use(rts.r[i], routes)
}
server.listen(8000, () => {console.log("server running")})
