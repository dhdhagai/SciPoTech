var electronInstaller = require('electron-winstaller');


var settings = {
    appDirectory: './build-win32-x64',
    authors: 'Dhruv Dhagai & Sai Shinkar',
    exe: './build.exe'
};

resultPromise = electronInstaller.createWindowsInstaller(settings);
 
resultPromise.then(() => {
    console.log("The installers of your application were succesfully created !");
}, (e) => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`)
});