//variables 
var phase = 0; var time = 0;
var terminalSTATE = 0;

var clicks = 0; var cash = 0;
//phase I variables
var clicksDisplayed = 0; var autoClickDisplayed = 0;
var clickPower = 1; var clickBoost = 1;
var autoPower = 0; var autoBoost = 1;
var multiplier = 1;

var clickPowerCost = 20; var autoclickCost = 50;
var newButtonCost = 1000; var boostCost = 3000;

var boost = 0;
var localButtonClicks = 0;

//phase II variables
var everSold = false;

var bParts = 0;
var bPartsCost = 5;
var bPartsGain = 10;

var bProduction = 0;
var bProductionCost = 10;

var bPS = 0;
var dataStorage = [];
//number abbreviator
const abbreviate = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n<1e6) return +(n/1e3).toFixed(2) + "K";
    if (n >= 1e6 && n<1e9) return +(n/1e6).toFixed(2) + "M";
    if (n >= 1e9 && n<1e12) return +(n/1e9).toFixed(2) + "B";
    if (n >= 1e12 && n<1e15) return +(n/1e12).toFixed(2) + "T";
    if (n >= 1e15 && n<1e18) return +(n/1e15).toFixed(2) + "Qa";
    if (n >= 1e18 && n<1e21) return +(n/1e18).toFixed(2) + "Qi";
    if (n >= 1e21 && n<1e24) return +(n/1e21).toFixed(2) + "Sx";
    if (n >= 1e24 && n<1e27) return +(n/1e24).toFixed(2) + "Sp";
    if (n >= 1e27 && n<1e30) return +(n/1e27).toFixed(2) + "Oc";
    if (n >= 1e30 && n<1e33) return +(n/1e30).toFixed(2) + "No";
    if (n >= 1e33 && n<1e36) return +(n/1e33).toFixed(2) + "Dc";
    if (n >= 1e36 && n<1e39) return +(n/1e36).toFixed(2) + "UDc";
    if (n >= 1e39 && n<1e42) return +(n/1e39).toFixed(2) + "DDc";
    }  

//reset
function reset(){
    localStorage.setItem("clickStorage", 0);
    location.reload();
}

//terminal
function terminalSHIFT(){
    document.getElementById("echo10").innerHTML = document.getElementById("echo9").innerHTML;
    document.getElementById("echo9").innerHTML = document.getElementById("echo8").innerHTML;
    document.getElementById("echo8").innerHTML = document.getElementById("echo7").innerHTML;
    document.getElementById("echo7").innerHTML = document.getElementById("echo6").innerHTML;
    document.getElementById("echo6").innerHTML = document.getElementById("echo5").innerHTML;
    document.getElementById("echo5").innerHTML = document.getElementById("echo4").innerHTML;
    document.getElementById("echo4").innerHTML = document.getElementById("echo3").innerHTML;
    document.getElementById("echo3").innerHTML = document.getElementById("echo2").innerHTML;
    document.getElementById("echo2").innerHTML = document.getElementById("echo1").innerHTML;
    document.getElementById("echo1").innerHTML = document.getElementById("echo").innerHTML;
}
function terminalUPDATE(){
    if(clicks>=12 && terminalSTATE==0){terminalSHIFT(); terminalSTATE++; document.getElementById("echo").style.animation = "textpulseA 0.5s"
        document.getElementById("echo").innerHTML="you can use the keyboard too, you know";}
    if(clicks>=50 && terminalSTATE==1){terminalSHIFT(); terminalSTATE++; phase++; document.getElementById("echo").style.animation = "textpulseB 0.5s"
        document.getElementById("echo").innerHTML="this is going too slow. we can do this more efficiently";}
    if(multiplier>=2 && terminalSTATE==2){terminalSHIFT(); terminalSTATE++; document.getElementById("echo").style.animation = "textpulseA 0.5s"
        document.getElementById("echo").innerHTML="now we're getting somewhere. maybe.";}
    if(boost>=2 && terminalSTATE==3){terminalSHIFT(); terminalSTATE++; document.getElementById("echo").style.animation = "textpulseB 0.5s"
        document.getElementById("echo").innerHTML="as you go on, more resources will become avaliable to you";}
    if(clicks>=1000000 && terminalSTATE==4){terminalSHIFT(); terminalSTATE++; document.getElementById("echo").style.animation = "textpulseA 0.5s"
        document.getElementById("echo").innerHTML="still so glacial. we can really do better";}
    if(clicks>=50000000 && terminalSTATE==5){terminalSHIFT(); terminalSTATE++; document.getElementById("echo").style.animation = "textpulseB 0.5s"
        document.getElementById("echo").innerHTML="why are we here anyway? to mash buttons? i guess i have nothing better to do, as a silly terminal";}
    if(clicks>=1e9 && terminalSTATE==6){terminalSHIFT(); terminalSTATE++; document.getElementById("echo").style.animation = "textpulseA 0.5s"
        document.getElementById("echo").innerHTML='you can automate buying upgrades now; click the "Autobuy" to toggle';}
    if(phase>=2 && terminalSTATE==7){terminalSHIFT(); terminalSTATE++; document.getElementById("echo").style.animation = "textpulseB 0.5s";
        document.getElementById("echo").innerHTML="let's try something new"+" // entered phase 2 in "+time+"s";}
    if(phase>=2 && terminalSTATE==8){terminalSHIFT(); terminalSTATE++; document.getElementById("echo").style.animation = "textpulseA 0.5s";
        document.getElementById("echo").innerHTML="your button is now reprogrammed, it makes a new button every 5 clicks";}
        
}

//utility functions
setInterval(update,1);
function update(){
    clicks+=(autoPower/60);
    clicksDisplayed = Math.round(clicks);
    document.getElementById("counterClick").innerHTML = abbreviate(clicksDisplayed)+" clicks";
    document.getElementById("counterCPS").innerHTML = abbreviate(autoPower)+"/second";
    if(everSold==true){document.getElementById("cashCounter").innerHTML = "Economy: "+"$"+abbreviate(cash);}
}
setInterval(clock,1000);
function clock(){
    time++;
    document.getElementById("timer").innerHTML = time+"s";

    dataStorage[0] = phase; dataStorage[1] = clicks; dataStorage[2] = cash; dataStorage[3] = terminalSTATE; dataStorage[4] = multiplier;
    localStorage.setItem("dataStorage", JSON.stringify(dataStorage));
    terminalUPDATE();

    if(clicks>1e11){phase=2; phaseIIsetup();}
    if(clicks>1e15){phase=3;}

    document.getElementById("title").innerHTML = abbreviate(clicksDisplayed)+" clicks";
    if(phase>=1){document.getElementById("shop1").style.display = "inline-block";}
    if(phase>=2){document.getElementById("shop2").style.display = "inline-block";}
    if(phase>=3){document.getElementById("shop3").style.display = "inline-block";}
}

// lets any key execute a click:
document.addEventListener('keyup',a => {click();})

  // if stored data exists, load it, else start at zero
  
  if (JSON.parse(localStorage.getItem("dataStorage"))) {
    var dataStorage = JSON.parse(localStorage.getItem("dataStorage"));
    clicks = dataStorage[2];
    } else{clicks = 0;}

