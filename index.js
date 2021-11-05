let fs = require('fs-extra');
let os = require('os');
let main = require('./app/resetPremPrefs.js');
let path = require('path');
let $ = require("./assets/js/jquery.min.js")
let moment = require('moment-timezone')
const exec = require('child_process').exec;
// const { ipcMain, ipcRenderer } = require('electron')

const { Table } = require("dynamo-light");
const userTable = new Table("Library");

let mainObj = {};

function setup(){
    //\get username and hostname
    mainObj.premVers = "14.0";

    let premPath2 = "\\Documents\\Adobe\\Premiere Pro\\" + mainObj.premVers +  "\\Profile-" + os.userInfo().username;
    let premPathLocal = path.normalize(os.homedir() + premPath2);
    let premPathVdi = path.normalize("\\\\la-cache\\user_profiles\\" + os.userInfo().username + "\\" + premPath2);

    mainObj.homedir = os.homedir();
    mainObj.hostname = os.hostname();
    mainObj.tempdir = os.tmpdir();
    mainObj.uptime = os.uptime();
    mainObj.username = os.userInfo().username;

    mainObj.aeSrc = path.normalize("\\\\la-cache\\adobe_cache\\media_admin\\after_effects\\");
    mainObj.aeDest = path.normalize(mainObj.homedir + "\\AppData\\Roaming\\Adobe\\After Effects\\")
    
    mainObj.premPath = (mainObj.hostname.includes('vedit'))? premPathVdi : premPathLocal;
    mainObj.defaultProfile = path.normalize('\\\\la-cache\\adobe_cache\\media_admin\\Default Profile');
    
    mainObj.editmatejsonSrc = path.normalize("\\\\la-cache\\adobe_cache\\media_admin\\editmate\\config.json");
    mainObj.editmatejsonDest = path.normalize("\\AppData\\Local\\ArvatoSystems\\EditMate\\Client\\config.JSON");
    mainObj.exportPresetsSrc = path.normalize("\\\\smb-wfe-prod\\edit-qxs-meda_admin\\_EDITORS\\03_Adobe Export\\");
    mainObj.exportPresetsDest = path.normalize(os.homedir() + "\\Documents\\Adobe\\Adobe Media Encoder\\14.0\\Presets\\");
    mainObj.auditionSrc = path.normalize("\\\\la-cache\\adobe_cache\\media_admin\\audition\\");
    mainObj.auditionDest = path.normalize("\\AppData\\Roaming\\Adobe\\Audition\\13.0\\")
    mainObj.startupSrc = path.normalize("\\\\la-cache\\adobe_cache\\media_admin\\startup_project\\");
    mainObj.startupDest = path.normalize(os.homedir + "\\Desktop\\");

    mainObj.adobeCache = [
        path.normalize(mainObj.homedir + "\\AppData\\Roaming\\Adobe\\Common\\Media Cache Files"),
        path.normalize(mainObj.homedir + "\\AppData\\Roaming\\Adobe\\Common\\Media Cache"),
        path.normalize(mainObj.homedir + "\\AppData\\Roaming\\Adobe\\Common\\Peak Files")
    ]
    

    console.log(mainObj)
    return mainObj
}

// document.onload = setup();
document.onload = (setup());

$("#adobeRepairButton").on("click", () => {
    main.resetPremPrefs(mainObj)
    // main.testing()
});




///Add to table is not complete - need to add 
async function addToTable(input){

    let toAdd = {host: input.hostname, user: input.username, date: moment().format("YYYYMMDD")}

    let dataObj = {
            Category: "Edit_Schedule",
            ID: "schedule"
        }

    let schedule = await userTable.get(dataObj)
    console.log(schedule)

    if(schedule.Item == null){
        dataObj.Data = {}
        dataObj.Data.edits = [toAdd]
        
        userTable.put(dataObj).then(() => {
                console.log("Added to table")
            })

    } else {
        let item = schedule.Item;
        item.Data.edits.push(toAdd)
        // console.log(93, schedule)
        
        for(i in item.Data.edits){
            let v = item.Data.edits[i];
            if(v.date != moment().format("YYYYMMDD")){
                console.log('REMOVED', v)
                item.Data.edits.splice(i, 1)
            }
        }

        userTable.update({Category: item.Category, ID: item.ID}, {Data: {edits: item.Data.edits}}).then((result) => {
            console.log(result)
            console.log("Updated table")
        })

    }



}


