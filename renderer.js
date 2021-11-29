// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// const TabGroup = require("electron-tabs");


// 2. Define the instance of the tab group (container)
// let tabGroup = new TabGroup({
    // If you want a new button that appends a new tab, include:
    // newTab: {
    //     title: 'New Tab',
    // }
// });

// 3. Add a tab from a website
// let tab1 = tabGroup.addTab({
//     title: "Post Reset",
//     src: "./app/post_tools.html",
//     visible: true,
//     active: true
// });

// 4. Add a new tab that contains a local HTML file
// let tab2 = tabGroup.addTab({
//     title: "Media Request",
//     src: "https://dashboard.nfl-mediarequest.com/",
//     visible: false,
//     // If the page needs to access Node.js modules, be sure to
//     // enable the nodeintegration
//     webviewAttributes: {
//         nodeintegration: true
//     }
// });