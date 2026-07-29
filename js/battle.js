function startBattle(beast){


currentEnemy={...beast};


document
.getElementById("beastList")
.hidden=true;


document
.getElementById("battleArea")
.hidden=false;



document
.getElementById("enemyImg")
.src=currentEnemy.img;


document
.getElementById("enemyName")
.textContent=currentEnemy.name;


renderEnemy();



}



function renderEnemy(){


document
.getElementById("enemyHP")
.textContent=
currentEnemy.hp;



}



document
.getElementById("attackButton")
.onclick=()=>{


currentEnemy.hp -= player.atk;


if(currentEnemy.hp<=0){


alert(
currentEnemy.name+"を倒した！"
);


return;


}



player.hp -= currentEnemy.atk;



if(player.hp<=0){

alert("敗北…");


player.hp=player.maxHP;


}



renderEnemy();

renderPlayer();


};
