const player = {


hp:300,


maxHP:300,


atk:40,


type:"炎"



};


function renderPlayer(){


document
.getElementById("playerHP")
.textContent =
player.hp;


document
.getElementById("playerATK")
.textContent =
player.atk;


document
.getElementById("playerType")
.textContent =
player.type;


}
