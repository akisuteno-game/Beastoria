let currentEnemy;



function renderBeasts(){


const list =
document.getElementById("beastList");


beasts.forEach(beast=>{


let div =
document.createElement("div");


div.className="card";


div.innerHTML=`

<img src="${beast.img}">

<h3>${beast.name}</h3>

<p>
属性:${beast.type}
</p>

<p>
HP:${beast.hp}
</p>

<button>
挑戦
</button>

`;



div.querySelector("button")
.onclick=()=>startBattle(beast);



list.appendChild(div);



});


}



window.onload=()=>{


renderPlayer();


renderBeasts();


};
