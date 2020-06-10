//Global Variables
//==============================================================================;

var cookiecount = 0.0;
var visualcount = "0";
var lastUpdate = new Date().getTime();
var lastUpdated = new Date().getTime();
var cps = 0;
var finalcps = 0;

var multipliercost = 10000;
var multiplier = 1;
var clickmultipliercost = 5000;
var clickmultiplier = 1;

var equip = ["autoclicker","farm","field","industry","corp","bank","military","island","planet","laser"];
var costEquip = ["clickercost","farmcost","fieldcost","industrycost","corpcost","bankcost","militarycost","islandcost","planetcost","lasercost"];
var ownedEquip = ["ownedclickers","ownedfarms","ownedfields","ownedindustries","ownedcorps","ownedbanks","ownedmilitaries","ownedislands","ownedplanets","ownedlasers"];

var upgrade = ["baseMultiplier","boostFrequency","costOfUpgrade","costOfEquipment"];
var costUpgrade = ["multipliercost","boostcost","upgradecost","equipmentcost"];
var currentMultipliers = ["c_multiplier","c_boost","c_upgrade","c_equipment"];

var muted = false;
var boosterval = 100;
var isBoosted = false;
var boostTimer = 60000; //time between each spawn;

//Initialize
//==============================================================================;

function tooltipmanager() {
    var equips = ["autoclickertooltip","farmtooltip","fieldtooltip","industrytooltip","corptooltip","banktooltip","militarytooltip","islandtooltip","planettooltip","lasertooltip"]
    var equip = ["autoclicker","farm","field","industry","corp","bank","military","island","planet","laser"]
    equips.forEach((e, i) => document.getElementById(e).innerHTML = "CPS: "+numberWithCommas(equipmentObj[equip[i]].cps)+"\nEarned: "+convertnumber(parseFloat(equipmentObj[equip[i]].totalEarnings)));
}
function initializeCosts() {
    ownedEquip.forEach((e, i) => document.getElementById(e).innerHTML = equipmentObj[equip[i]].owned);
    costEquip.forEach((e, i) => document.getElementById(e).innerHTML = convertnumber(equipmentObj[equip[i]].cost));
}
function initializeUpgrades() {
    costUpgrade.forEach((e,i) => document.getElementById(e).innerHTML = convertnumber(upgradeObj[upgrade[i]].cost));
    currentMultipliers.forEach((e,i) => document.getElementById(e).innerHTML = "x" + convertnumber(upgradeObj[upgrade[i]].currentMultiplier));
}
//Updates
//==============================================================================;

function convertnumber(numbers) {
    var number = parseFloat(numbers).toFixed(2);
    if(number >= 1000000000000000000000000000) {
        number = (number/1000000000000000000000000000).toFixed(2)+"G";
    }
    if(number >= 1000000000000000000000000) {
        number = (number/1000000000000000000000000).toFixed(2)+"Dc";
    }
    if(number >= 1000000000000000000000) {
        number = (number/1000000000000000000000).toFixed(2)+"N";
    }
    if(number >= 1000000000000000000) {
        number = (number/1000000000000000000).toFixed(2)+"Qn";
    }
    if(number >= 1000000000000000) {
        number = (number/1000000000000000).toFixed(2)+"Qd";
    }
    if(number >= 1000000000000) {
        number = (number/1000000000000).toFixed(2)+"T";
    }
    if(number >= 1000000000) {
        number = (number/1000000000).toFixed(2)+"B";
    }
    if(number >= 1000000) {
        number = (number/1000000).toFixed(2)+"M";
    }
    if(number >= 1000) {
        number = (number/1000).toFixed(2)+"t";
    }
    return number;
}
function update() {
    //visualcount = parseInt(Math.floor(cookiecount));
    visualcount = Number(Math.floor(cookiecount));
    
    if(visualcount >= 1000000000000000000000000000) {
        visualcount = parseFloat(visualcount/1000000000000000000000000000).toFixed(2)+"G";
    }
    if(visualcount >= 1000000000000000000000000) {
        visualcount = parseFloat(visualcount/1000000000000000000000000).toFixed(2)+"Dc";
    }
    if(visualcount >= 1000000000000000000000) {
        visualcount = parseFloat(visualcount/1000000000000000000000).toFixed(2)+"N";
    }
    if(visualcount >= 1000000000000000000) {
        visualcount = parseFloat(visualcount/1000000000000000000).toFixed(2)+"Qn";
    }
    if(visualcount >= 1000000000000000) {
        visualcount = (visualcount/1000000000000000).toFixed(2)+"Qd";
    }
    if(visualcount >= 1000000000000) {
        visualcount = (visualcount/1000000000000).toFixed(2)+"T";
    }
    if(visualcount >= 1000000000) {
        visualcount = (visualcount/1000000000).toFixed(2)+"B";
    }
    if(visualcount >= 1000000) {
        visualcount = (visualcount/1000000).toFixed(2)+"M";
    }
    if(visualcount >= 1000) {
        visualcount = (visualcount/1000).toFixed(2)+"t";
    }
    
    document.getElementById('man').innerHTML = visualcount;
}
function totalEarned(id){
    equipmentObj[id].totalEarnings = equipmentObj[id].totalEarnings + ((new Date().getTime() - lastUpdate) * equipmentObj[id].owned * equipmentObj[id].cps * upgradeObj['baseMultiplier'].currentMultiplier) / 1000.0;
}
function updateHTML() {
    document.getElementById('cpsid').innerHTML = "You are earning " + convertnumber(finalcps) + "  cookies per second.";
    document.getElementById('cpcid').innerHTML = "You earn " + (clickmultiplier * multiplier) + "  cookies per click.";
    //document.getElementById('multipliercost').innerHTML = "Buy x" + (multiplier + 1) + " multiplier for " + convertnumber(Math.ceil(multipliercost)) + " cookies.";
    //document.getElementById('currentmultiplier').innerHTML = "Current multiplier: x" + multiplier;
    //document.getElementById('clickmultipliercost').innerHTML = "Buy x" + (clickmultiplier + 1) + " click multiplier for " + convertnumber(Math.ceil(clickmultipliercost)) + " cookies.";
    //document.getElementById('currentclickmultiplier').innerHTML = "Current multiplier: x" + clickmultiplier;
    costUpgrade.forEach((e,i) => document.getElementById(e).innerHTML = convertnumber(upgradeObj[upgrade[i]].cost));
    currentMultipliers.forEach((e,i) => document.getElementById(e).innerHTML = "x" + convertnumber(upgradeObj[upgrade[i]].currentMultiplier));

    ownedEquip.forEach((e, i) => document.getElementById(e).innerHTML = equipmentObj[equip[i]].owned);
    costEquip.forEach((e, i) => document.getElementById(e).innerHTML = convertnumber(Math.ceil(equipmentObj[equip[i]].cost)));
}
function timer() {
    cookiecount = cookiecount + ((new Date().getTime() - lastUpdate) * finalcps) / 1000.0;
    equip.forEach(totalEarned);
    //equipmentObj["autoclicker"].totalEarnings = equipmentObj["autoclicker"].totalEarnings + ((new Date().getTime() - lastUpdate) * equipmentObj["autoclicker"].owned * equipmentObj["autoclicker"].cps) / 1000.0;
    lastUpdate = new Date().getTime();
    //document.getElementById("autoclickertooltip").innerHTML = parseInt(equipmentObj["autoclicker"].totalEarnings);
    tooltipmanager();
    update();
}
setInterval(timer, 1)

//Active Functions
//==============================================================================;

function clicked() {
    cookiecount = cookiecount + (upgradeObj['baseMultiplier'].currentMultiplier);
    update();
}
function buyEquipment(id) {
    if(cookiecount >= equipmentObj[id].cost) {
        cookiecount = cookiecount - equipmentObj[id].cost;
        update();
        equipmentObj[id].cost = equipmentObj[id].cost * equipmentObj[id].costExponent;
        equipmentObj[id].owned = equipmentObj[id].owned + 1;
        cps = cps + equipmentObj[id].cps;
        checkfinalcps();
        updateHTML();
    }
}
function buyMultiplier(id) {
    if(cookiecount >= upgradeObj[id].cost) {
        cookiecount = cookiecount - upgradeObj[id].cost;
        upgradeObj[id].currentMultiplier = upgradeObj[id].currentMultiplier * upgradeObj[id].multiplier;
        upgradeObj[id].cost = upgradeObj[id].cost * upgradeObj[id].costExponent;
        if(id == "costOfEquipment"){
            Object.keys(equipmentObj).forEach((e,i) => equipmentObj[e].cost = equipmentObj[e].cost * upgradeObj["costOfEquipment"].currentMultiplier)
        }
        if(id == "costOfUpgrade"){
            Object.keys(upgradeObj).forEach((e,i) => upgradeObj[e].cost = upgradeObj[e].cost * upgradeObj["costOfUpgrade"].currentMultiplier)
        }
        checkfinalcps();
        updateHTML();
    }
}
function buymax(id) {
    var oldcookiecount = cookiecount;
    var oldcost = equipmentObj[id].cost;
    var i = buymaximum(id);
    cookiecount = oldcookiecount;
    equipmentObj[id].cost = oldcost;
    while(i >= 1) {
        i = i - 1;
        buyEquipment(id);
    }
}
function buymaximum(id){ //recursion for buying max;
    var buyAmount = 0;
    if(cookiecount >= equipmentObj[id].cost) {
        buyAmount = buyAmount + 1;
        cookiecount = cookiecount - equipmentObj[id].cost;
        equipmentObj[id].cost = equipmentObj[id].cost * equipmentObj[id].costExponent;
        return buyAmount + buymaximum(id);
    }
    else {
        return buyAmount;
    }
}

//Functionality
//==============================================================================;

function checkfinalcps() {
    if(isBoosted){
        finalcps = cps * upgradeObj['baseMultiplier'].currentMultiplier * boosterval;
        document.getElementById('cpsid').innerHTML = "You are earning " + convertnumber(finalcps) + "  cookies per second.";
    }else{
        finalcps = cps * upgradeObj['baseMultiplier'].currentMultiplier;
        document.getElementById('cpsid').innerHTML = "You are earning " + convertnumber(finalcps) + "  cookies per second.";
    }
    
}
function numberWithCommas(x) {  //this function takes a number and adds a comma seperator every 3 digits from the right;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function playsound(soundid) {
    var thissound = document.getElementById(soundid);
    thissound.play();
}
function playsound2(soundid) {
    var thissound = document.getElementById(soundid);
    thissound.currentTime = 0;
    thissound.play();
}
function stopsound(soundid) {
    var thissound = document.getElementById(soundid);
    thissound.pause();
    thissound.currentTime = 0;
}
function resetsound(soundid) {
    var thissound = document.getElementById(soundid);
    thissound.currentTime = thissound.duration;
}
function mutetoggle() {
    var thissound = document.getElementById('mysound');
    var thissound2 = document.getElementById('mysound2');
    if(!muted) {
        muted = true;
        thissound.volume = 0;
        thissound2.volume = 0;
    }
    else {
        muted = false;
        thissound.volume = 0.25;
        thissound2.volume = 0.25;
    }
}







var boostMan = true;

function sendBooster(element) {
    var startx = -100;
    var starty = 750;

    var endx = 2050;
    //var endy = 750;

    var speedx = 0.25;
    //var speedx = 5;
    var speedy = 0.25;

    var maxy = 825;
    var miny = 675;

    var currentx = startx;
    var currenty = starty;

    var item = document.getElementById(element).style;
    item.display = 'block';
    var id = setInterval(frame,5);
    

    function frame(){
        if(currentx > endx || !boostMan){
            document.getElementById(element).style.display = 'none';
            document.getElementById(element).style.top = starty + 'px';
            document.getElementById(element).style.left = startx + 'px';
            clearInterval(id);
            boostMan = true;       
        }else{
            currentx = currentx + (speedx);
            item.left = currentx + 'px';
            if(currenty > maxy || currenty < miny){
                speedy = speedy * -1;   
            }
            console.log("sending");
            currenty = currenty + speedy;
            item.top = currenty + 'px';
        }
    }
}

function pickItem(){
    pickItemBool = false;
    var boosterPack = ['bigboost','smallreward','bigreward'];
    var itemPicked = boosterPack[Math.floor(Math.random() * boosterPack.length)];
    console.log(boostTimer/upgradeObj['boostFrequency'].currentMultiplier);
    sendBooster(itemPicked);   
    clearInterval(pickItemTime); 
}
var pickItemTime = setInterval(pickItem, boostTimer/upgradeObj['boostFrequency'].currentMultiplier);   //Every 30 seconds, pick a random boost and call the sendBooster function;




//Boosters
function bigbooster(){
    let previouscps = finalcps; 
    isBoosted = true; 
    finalcps *= boosterval;
    checkfinalcps();

    var i = 0;
    var id = setInterval(now,1000);
    function now(){
        if(i == 15){
            isBoosted = false;
            checkfinalcps();
            clearInterval(id);            
        }else{
            i++;
        }
    }
}
function instantCookies(){
    var min = 100;
    var max = cps * upgradeObj['baseMultiplier'].currentMultiplier * 1800;

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    var reward = getRndInteger(min,max);
    cookiecount = cookiecount + reward;
}
function instantCookies2(){
    var min = 100;
    var reward = min + cps * upgradeObj['baseMultiplier'].currentMultiplier * 900;
    cookiecount += reward;
}
function isClicked(id){
    boostMan = false;
    document.getElementById(id).style.display = 'none';
}