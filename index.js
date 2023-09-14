
const { getVideos } = require("./Services/notion");
const express = require("express");
const path = require("path");
const server = express();
const { app, BrowserWindow } = require("electron");
const WhichBrowser = require("which-browser");
require("dotenv").config();
if (handleSquirrelEvent(app)) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}
function handleSquirrelEvent(application) {
  if (process.argv.length === 1) {
      return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
      let spawnedProcess, error;

      try {
          spawnedProcess = ChildProcess.spawn(command, args, {
              detached: true
          });
      } catch (error) {}

      return spawnedProcess;
  };

  const spawnUpdate = function(args) {
      return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
      case '--squirrel-install':
      case '--squirrel-updated':
          // Optionally do things such as:
          // - Add your .exe to the PATH
          // - Write to the registry for things like file associations and
          //   explorer context menus

          // Install desktop and start menu shortcuts
          spawnUpdate(['--createShortcut', "SciPoTech"]);

          setTimeout(application.quit, 1000);
          return true;

      case '--squirrel-uninstall':
          // Undo anything you did in the --squirrel-install and
          // --squirrel-updated handlers

          // Remove desktop and start menu shortcuts
          spawnUpdate(['--removeShortcut', "SciPoTech"]);

          setTimeout(application.quit, 1000);
          return true;

      case '--squirrel-obsolete':
          // This is called on the outgoing version of your app before
          // we update to the new version - it's the opposite of
          // --squirrel-updated

          application.quit();
          return true;
  }
};
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./public/preload.js"),
    },
  });

  win.loadFile("./public/index.html");
}
try {
  app.whenReady().then(() => {
    createWindow();
  });
} catch (e) {
  console.log(
    'Running Node.js. Please Run "npx electron ." to open an interface. http://localhost:8000'
  );
}

server.use(express.static(path.resolve("./public")));
// Route for the about page
server.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

// Route for the home page (index)

server.get("/hospitals", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "hospitals.html"));
});

// Route for the index page (if index.html exists in 'public' folder)
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
server.get("/tips", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "tips.html"));
});

server.listen(process.env.PORT, () => {
  console.log("server running on port " + process.env.PORT);
});
