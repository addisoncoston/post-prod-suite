
module.exports.resetPremPrefs = (input) => {
    return new Promise(async (resolve, reject) => {
        // load('startSpin');
        console.log("start")
        $("#adobeRepairButton").removeClass("btn-success")
        $("#adobeRepairButton").addClass("btn-primary")
        $("#iconAdobeRepair").addClass("fa-ambulance")
        // $("#adobeRepairButton").removeClass("btn-primary")
        $("#adobeRepairButton").addClass("disabled")
        let status = await isRunning('Adobe Premiere Pro.exe')

        console.log("Premiere Running:", status)

        if(status == true && $("#checkPrem").is(":checked")){
            $("#iconAdobeRepair").removeClass("fa-ambulance")
            $("#iconAdobeRepair").addClass("fa-ban")

            $("#progBar").addClass("bg-danger")
            $("#progBar").width("100%")
            $("#adobeRepairText").addClass("text-danger")
            $("#adobeRepairText").html("Adobe Premiere Pro is running. Please close it and try again.")
            console.log("Premiere is running")
            return
        }
        
        $("#progBar").removeClass("bg-success")
        $("#progBar").addClass("progress-bar-striped")
        
        $("#adobeRepairText").html("Run this at the beginning of each shift and whenever you crash.")
        $("#adobeRepairText").removeClass("text-danger")
        $("#progBar").removeClass("bg-danger")

       
        document.getElementById("progBarDiv").classList.remove("hidden")
        document.getElementById("progBar").style.width = "10%"

        console.log('start', moment().format("MM-DD-YY HH:mm ss.mm") + 'secs')
        let tempPath = path.normalize(input.tempdir + "/adobe_repair/" + moment().format("YYYYMMDD_HHmmss"));
        let mainObj = {
            userKeys: {
                local : path.normalize(input.premPath + '/Win'),
                temp : path.normalize(tempPath + '/Win')
            },
            userLayouts: {
                local : path.normalize(input.premPath + '/Layouts'),
                temp : path.normalize(tempPath + '/Layouts')
            },
            status: 0
        }
        
        console.log(mainObj)

        if($("#checkPrem").is(":checked")){
            console.log(52)
            await copyTo(input.premPath, tempPath);
            document.getElementById("progBar").style.width = "20%"
            await emptyPath(input.premPath);
            document.getElementById("progBar").style.width = "30%"
            await copyTo(input.defaultProfile, input.premPath);
            document.getElementById("progBar").style.width = "40%"
        }

        if($("#checkAe").is(":checked")){
            await copyTo(input.aeSrc, input.aeDest)
        }
        
        if($("#checkAudition").is(":checked")){
            await copyTo(input.auditionSrc, path.normalize(input.homedir + input.auditionDest))
            document.getElementById("progBar").style.width = "50%";
        } 
        
        if($("#checkAdobeCache").is(":checked")){
            console.log(74)
            // $("#confirmModal").modal("hide")

            // if(confirmation){
                for(let i = 0; i < input.adobeCache.length; i++){
                    await emptyPath(input.adobeCache[i])
                    console.log("CLEARED-", input.adobeCache[i])
                }
            // }


            // fs.emptyDir(input.cachePath, () => {
            //     console.log("Cache cleared")
            // })


        }


        if($("#checkStartupProj").is(":checked")){
            await copyTo(input.startupSrc, input.startupDest);
            document.getElementById("progBar").style.width = "60%";
        }

        if($("#checkExport").is(":checked")){
            await copyTo(input.exportPresetsSrc, input.exportPresetsDest)
            document.getElementById("progBar").style.width = "90%"
        }

        if($("#checkEditmate").is(":checked")){
            fs.ensureDir(path.dirname(path.normalize(input.homedir + input.editmatejsonDest)), (err) => {console.log(err)})
            await copyTo(input.editmatejsonSrc, path.normalize(input.homedir + input.editmatejsonDest))
        }


        

        if($("#checkUserSettings").is(":checked")){
            if(fs.pathExistsSync(mainObj.userKeys.temp) && fs.pathExistsSync(mainObj.userKeys.local) && fs.pathExistsSync(mainObj.userLayouts.temp) && fs.pathExistsSync(mainObj.userLayouts.local)){
                await copyTo(mainObj.userKeys.temp, mainObj.userKeys.local)
                await copyTo(mainObj.userKeys.temp, mainObj.userLayouts.local)
            }
            
        }
        // document.getElementById("progBar").style.width = "80%"
        document.getElementById("progBar").style.width = "100%"
        // document.getElementById("iconAdobeRepair").classList.remove("fa-spin")
        $("#progBar").addClass("bg-success")
        $("#progBar").removeClass("progress-bar-striped")
        $("#adobeRepairButton").removeClass("disabled")
        $("#adobeRepairButton").addClass("btn-success")

        console.log("end", moment().format("MM-DD-YY HH:mm ss.SS") + 'secs')
        resolve()
    })
}



function copyTo(from, to){
    return new Promise((resolve, reject) => {

    // if(!fs.pathExistsSync(from) && !fs.pathExistsSync(to)){
    //     reject()
    // }
    fs.copy(from, to, () => {
        console.log(83, from, to)
        resolve()
    })
    
    })
}

async function emptyPath(input) {
    try {
      await fs.emptyDir(input)
      console.log('success!')
    } catch (err) {
      console.error(err)
    }
  }

function resetProgBar(input){
    $("#adobeRepairButton").removeClass("btn-success").fadeIn(3000)
    $("#adobeRepairButton").addClass("btn-primary")
    
    
}

const isRunning = (query) => {

    return new Promise((resolve, reject) => {

        let platform = process.platform;
        let cmd = '';
        switch (platform) {
            case 'win32' : cmd = `tasklist`; break;
            case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
            case 'linux' : cmd = `ps -A`; break;
            default: break;
        }
        exec(cmd, (err, stdout, stderr) => {
            resolve(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
        });

    })
    
}

function load(input){

    if(input != "startSpin"){
        $("#iconAdobeRepair").removeClass("fa-spin")
    } else {
        $("#iconAdobeRepair").addClass("fa-spin")
    }
    
}




module.exports.testing = (input) => {

    console.log($("#checkUserSettings").is(":checked"))
}
