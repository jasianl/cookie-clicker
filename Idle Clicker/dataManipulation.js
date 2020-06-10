//var ownedEquip = ["ownedclicker","ownedfarm","ownedfield","ownedindustry","ownedcorp","ownedbank","ownedmilitary","ownedisland","ownedplanet","ownedlaser"]
//var costEquip = ["clickerprice","farmprice","fieldprice","industryprice","corpprice","bankprice","militaryprice","islandprice","planetprice","laserprice"]
var totalEarnedEquip = ["earnedclicker","earnedfarm","earnedfield","earnedindustry","earnedcorp","earnedbank","earnedmilitary","earnedisland","earnedplanet","earnedlaser"]

function reset() {
    localStorage.clear();
    Object.keys(equipmentObj).forEach(myfunction);
    Object.keys(upgradeObj).forEach(myfunction2);
    function myfunction(value, index) {
        localStorage.setItem(ownedEquip[index], 0);
        localStorage.setItem(totalEarnedEquip[index], 0)
        localStorage.setItem(costEquip[index], equipmentObj[value].baseCost);
    }
    function myfunction2(value, index) {
        localStorage.setItem(costUpgrade[index], upgradeObj[value].baseCost);
        localStorage.setItem(currentMultipliers[index], 1);
    }
    localStorage.setItem("cps",0);
    localStorage.setItem("cookiecount",0);
    localStorage.setItem("visualcount",0);
    updateHTML();
}
function save() {
    Object.keys(equipmentObj).forEach(myfunction);
    Object.keys(upgradeObj).forEach(myfunction2);
    function myfunction(value, index) {
        localStorage.setItem(ownedEquip[index], equipmentObj[value].owned);
        localStorage.setItem(totalEarnedEquip[index], equipmentObj[value].totalEarnings);
        localStorage.setItem(costEquip[index], equipmentObj[value].cost);
    }
    function myfunction2(value, index) {
        localStorage.setItem(costUpgrade[index], upgradeObj[value].cost);
        localStorage.setItem(currentMultipliers[index], upgradeObj[value].currentMultiplier);
    }

    localStorage.setItem("cps",cps);
    localStorage.setItem("cookiecount",cookiecount);
    localStorage.setItem("visualcount",visualcount);
}
function load() {
    cookiecount = parseFloat(localStorage.getItem("cookiecount"));
    visualcount = parseInt(localStorage.getItem("visualcount"));
    cps = parseFloat(localStorage.getItem("cps"));
    
    Object.keys(equipmentObj).forEach(myfunction);
    Object.keys(upgradeObj).forEach(myfunction2);
    function myfunction(value,index) {
        equipmentObj[value].owned = parseInt(localStorage.getItem(ownedEquip[index]));
        equipmentObj[value].totalEarnings = parseFloat(localStorage.getItem(totalEarnedEquip[index]));
        equipmentObj[value].cost = parseFloat(localStorage.getItem(costEquip[index]));
    }
    function myfunction2(value,index,array) {
        upgradeObj[value].cost = parseFloat(localStorage.getItem(costUpgrade[index]));
        upgradeObj[value].currentMultiplier = parseFloat(localStorage.getItem(currentMultipliers[index]));
    }
    checkfinalcps();
    updateHTML();
}