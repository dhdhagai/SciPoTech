var electronInstaller = require('electron-winstaller');


var settings = {
    // Specify the folder where the built app is located
    appDirectory: './build-win32-x64',
    // Specify the existing folder where 
    outputDirectory: './myapp-source-built-installers',
    // The name of the Author of the app (the name of your company)
    authors: 'Dhruv Dhagai & Sai Shinkar',
    // The name of the executable of your built
    exe: './build.exe'
};

resultPromise = electronInstaller.createWindowsInstaller(settings);
 
resultPromise.then(() => {
    console.log("The installers of your application were succesfully created !");
}, (e) => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`)
});