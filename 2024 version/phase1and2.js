//click
document.getElementById("primary").addEventListener("click",click);
function click(){
    clicks+=clickPower;

    if(phase>=2){
        localButtonClicks++;
        document.getElementById("up1").innerHTML = "Make button "+ "("+localButtonClicks+"/"+"5)";
        if(localButtonClicks>=5){
        localButtonClicks=0;
        multiply(); multiplier+=clickPower; document.getElementById("primary").innerHTML = "x"+abbreviate(multiplier);
        }
    }
}
function multiply(){
    autoPower*=2;
    autoBoost*=2;
    if(phase<2){
        clickPower*=2;
        document.getElementById("up1").innerHTML = "<div class='modest bold'>"+"Click Power: "+abbreviate(clickPower)+"</div>";
    }
    document.getElementById("u3Shop").innerHTML = "Cost: "+abbreviate(newButtonCost)
    document.getElementById("up3").innerHTML = "<div class='modest bold'>"+"New button: "+abbreviate(multiplier)+"</div>";
    document.getElementById("primary").innerHTML = "x"+abbreviate(multiplier);
    if (multiplier>=5 && phase<2){
    clickBoost*=1.3;
    autoBoost*=5;
    }
    if (phase>=2){
        autoPower*=0.51;
        autoBoost*=0.51;
    }
}

//upgrade functions
document.getElementById("up1").addEventListener("click",up1);
function up1(){
    if(clicks>=clickPowerCost && phase==1){
        clickPower+=(1*multiplier*clickBoost);
        clicks-=clickPowerCost;
        clickPowerCost*=1.1;
        if (multiplier>=5){clickPowerCost*=1.5;}
        document.getElementById("u1Shop").innerHTML = "Cost: "+abbreviate(Math.round(clickPowerCost));
        document.getElementById("up1").innerHTML = "<div class='modest bold'>"+"Click Power: "+abbreviate(clickPower)+"</div>";
    }
}

document.getElementById("up2").addEventListener("click",up2);
function up2(){
    if(clicks>=autoclickCost){
        autoPower+=(10*multiplier*autoBoost);
        clicks-=autoclickCost;
        autoClickDisplayed++;
        autoclickCost*=1.5;
        if (multiplier>=7){autoclickCost*=1.333;}
        document.getElementById("u2Shop").innerHTML = "Cost: "+abbreviate(Math.round(autoclickCost));
        document.getElementById("up2").innerHTML = "<div class='modest bold'>"+"Autoclicker: "+abbreviate(autoClickDisplayed)+"</div>";
    }
}

document.getElementById("up3").addEventListener("click",up3);
function up3(){
    if(clicks>=newButtonCost){
        multiplier++;
        clicks-=newButtonCost;
        newButtonCost*=10;
        multiply();
    }
}

document.getElementById("bst1").addEventListener("click",b1);
function b1(){
    if(clicks>=boostCost){
        autoPower*=3;
        autoBoost*=3;
        clicks-=boostCost;
        boostCost*=3;
        boost++;
        document.getElementById("bst1").innerHTML = "<div class='modest bold'>"+"</div>";
        document.getElementById("bst1").style.animation = "fadetowhite 1s ease-in-out 1";
        setTimeout(boostPART2,1001);
    }
}
function b2(){
    if(clicks>=boostCost){
        clickPower*=10;
        clickBoost*=100;
        clicks-=boostCost;
        boostCost*=1000;
        boost++;
        document.getElementById("up1").innerHTML = "<div class='modest bold'>"+"Click Power: "+abbreviate(clickPower)+"</div>";
        document.getElementById("bstShop").innerHTML = "Cost: "+abbreviate(boostCost);
        document.getElementById("bst1").innerHTML = "<div class='modest bold'>"+"</div>";
        document.getElementById("bst1").style.animation = "fadetowhite 1s ease-in-out 1";
        setTimeout(boostPART2,1001);
    }
}
function b3(){
    if(clicks>=boostCost){
        autoPower*=100;
        autoBoost*=200;
        clicks-=boostCost;
        boost++;
        document.getElementById("bst1").innerHTML = "<div class='modest bold'>"+"</div>";
        document.getElementById("bst1").style.animation = "fadetowhite 1s ease-in-out 1";
        setTimeout(boostPART2,1001);
    }
}
function b4(){
    if(cash>=boostCost){
        autoclickCost=50;
        newButtonCost=1000;
        bPartsCost = 5;
        bProductionCost = 10;
        boost++;
        document.getElementById("bst1").removeEventListener("click",b4);
        document.getElementById("bst1").style.animation = "fadetowhite 1s ease-in-out 1";
        setTimeout(boostPART2,1001);
    }
}
function boostPART2(){
    if(boost==1){
    document.getElementById("bst1").innerHTML = "<div class='modest bold'>"+"Strong clicks"+"</div>";
    document.getElementById("bst1").removeEventListener("click",b1);
    document.getElementById("bst1").addEventListener("click",b2);
    } else if(boost==2){
    document.getElementById("bst1").innerHTML = "<div class='modest bold'>"+"Potent clicks"+"</div>";
    } else if(boost==3){
    document.getElementById("bst1").innerHTML = "<div class='modest bold'>"+"Automation"+"</div>";
    document.getElementById("bst1").removeEventListener("click",b2);
    document.getElementById("bst1").addEventListener("click",b3);
    } else if(boost==4){
    document.getElementById("bst1").innerHTML = "<div class='modest bold'>"+"Price Bailout"+"</div>";
    document.getElementById("bst1").removeEventListener("click",b3);
    document.getElementById("bst1").addEventListener("click",b4);
    boostCost = 100;
    } else if(boost==5) {
    document.getElementById("bst1").style.display = "none"; 
    document.getElementById("bstShop").style.display = "none"; 
    document.getElementById("u2Shop").innerHTML = "Cost: "+abbreviate(Math.round(autoclickCost));
    document.getElementById("u3Shop").innerHTML = "Cost: "+abbreviate(newButtonCost)
    document.getElementById("u5Shop").innerHTML = "Cost: $"+abbreviate(bPartsCost)
    document.getElementById("u6Shop").innerHTML = "Cost: $"+abbreviate(bProductionCost)
    }
    document.getElementById("bst1").style.animation = "none";
    document.getElementById("bstShop").innerHTML = "Cost: "+abbreviate(boostCost);
    if(boost>=4){document.getElementById("bstShop").innerHTML = "Cost: $"+abbreviate(boostCost);}
}

//auto-buy
var autobuyLOCK = 1;
document.getElementById("bst2").addEventListener("click",enableAutoBuy);
function autobuy(){
    if (autobuyLOCK==0){
    if(clicks>=clickPowerCost){up1();}
    if(clicks>=autoclickCost){up2();}
    if(clicks>=newButtonCost){up3();}
    if(phase==1){document.getElementById("up1").innerHTML = "<div class='modest bold'>"+"Click Power: "+abbreviate(clickPower)+"</div>";}
    if(phase>=2){buyBParts();buyBProduction();}
    document.getElementById("up2").innerHTML = "<div class='modest bold'>"+"Autoclicker: "+abbreviate(autoClickDisplayed)+"</div>";
    }
}
function enableAutoBuy(){if(clicks>=1e9){
    if(!enableAutoBuy.didrun){
    clicks-=1e9;
    document.getElementById("bst2Shop").innerHTML = "";
    enableAutoBuy.didrun = true;
    }
    autobuyLOCK = 0;
    setInterval(autobuy, 1);
    document.getElementById("bst2").removeEventListener("click",enableAutoBuy);
    document.getElementById("bst2").addEventListener("click",disableAutoBuy);
    document.getElementById("bst2").innerHTML = "<div class='modest bold'>"+"Autobuy: Active"+"</div>";
    document.getElementById("bst2").style.animation = "greenpulse 2s ease-in-out infinite";
    document.getElementById("autoBuyStatus").innerHTML = "autobuy: active"
}}
function disableAutoBuy(){
    autobuyLOCK = 1;
    document.getElementById("bst2").removeEventListener("click",disableAutoBuy);
    document.getElementById("bst2").addEventListener("click",enableAutoBuy);
    document.getElementById("bst2").innerHTML = "<div class='modest bold'>"+"Autobuy: Disabled"+"</div>";
    document.getElementById("bst2").style.animation = "redpulse 2s ease-in-out infinite";
    document.getElementById("autoBuyStatus").innerHTML = "autobuy: disabled"
}

function phaseIIsetup(){
    clickPower=1;
    clickBoost=1;
    document.getElementById("up1").classList = "button secondary blue modest bold";
    document.getElementById("up1").innerHTML = "Make button "+ "("+localButtonClicks+"/"+"5)";
    document.getElementById("u1Shop").innerHTML = "finished";
}

//the inverse of buying a button
document.getElementById("up4").addEventListener("click",sellButton);
function sellButton(){
    if(multiplier>1){
        everSold = true;
        cash+=2;
        multiplier--;
        autoPower*=0.99;
        autoBoost*=0.95;
        document.getElementById("up3").innerHTML = "<div class='modest bold'>"+"New button: "+abbreviate(multiplier)+"</div>";
        document.getElementById("primary").innerHTML = "x"+abbreviate(multiplier);
    }
}
document.getElementById("up5").addEventListener("click",buyBParts);
function buyBParts(){
    if(cash>=bPartsCost){
        cash-=bPartsCost;
        bPartsCost+=5;
        bParts+=bPartsGain;
        bPartsGain+=5;
        document.getElementById("u5Shop").innerHTML = "Cost: $"+abbreviate(bPartsCost)
    }
}
document.getElementById("up6").addEventListener("click",buyBProduction);
function buyBProduction(){
    if(cash>=bProductionCost){
        cash-=bProductionCost;
        bProduction+=1;
        bProductionCost+=10;
        document.getElementById("u6Shop").innerHTML = "Cost: $"+abbreviate(bProductionCost)
    }
}

setInterval(updatePhaseII,1000)
function updatePhaseII(){
    document.getElementById("avaliableParts").innerHTML = abbreviate(bParts) + " avaliable parts";
    document.getElementById("productionSites").innerHTML = abbreviate(bProduction) + " sites of production";
    document.getElementById("counterBPS").innerHTML = abbreviate(bPS) + " buttons/second";
    document.getElementById("efficiency").innerHTML = "operation nominal"
    if(bParts>=bProduction && bProduction>0){
        bPS=bProduction;
        bParts-=bProduction;
        document.getElementById("avaliableParts").innerHTML = abbreviate(bParts) + " avaliable parts";
        multiplier+=bProduction;
        autoPower*=1.1; autoBoost*=1.1;
        document.getElementById("up3").innerHTML = "<div class='modest bold'>"+"New button: "+abbreviate(multiplier)+"</div>";
        document.getElementById("primary").innerHTML = "x"+abbreviate(multiplier);
    } else {bPS=0;}
}

