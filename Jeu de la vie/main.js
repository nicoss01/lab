let demarre=false
let tailleCellule=15
let tailleX=tailleCellule*30
let tailleY=tailleCellule*30
document.querySelector("#zone").style.width=tailleX+"px"
document.querySelector("#zone").style.height=tailleY+"px"
for(let y=0;y<tailleY;y+=tailleCellule){
    for(let x=0;x<tailleX;x+=tailleCellule){
        let cellule=document.createElement("div")
        cellule.style.width=tailleCellule+"px"
        cellule.style.height=tailleCellule+"px"
        cellule.setAttribute("data-x",x)
        cellule.setAttribute("data-y",y)
        document.querySelector("#zone").append(cellule)
    }    
}
let numeroGeneration=0
document.querySelectorAll("main>div").forEach( item => {
    item.addEventListener("click",event => {
        item.classList.toggle("active")
    })
})
document.querySelector("button").addEventListener("click",bouton => {
    if(demarre==false){
        alert("Lancement de l'évolution !")
        numeroGeneration=0
        bouton.target.innerHTML ="Mettre l'évolution en pause"
        document.getElementById("num").innerHTML="Génération #"+numeroGeneration
        demarre=true
        evolution()
    }else{
        alert("Arret de l'évolution")
        clearTimeout(timer);
        document.getElementById("num").innerHTML="Evolution stoppée à la génération #"+numeroGeneration
        bouton.target.innerHTML ="Evolution Go !"
        demarre=false
    }
})
let timer=null
function evolution(){
    if(document.querySelectorAll(".vaNaitre").length==document.querySelectorAll("main>div").length||document.querySelectorAll(".vaMourir").length==document.querySelectorAll("main>div").length){
        alert("Fin de l'évolution")
        clearTimeout(timer);
        document.getElementById("num").innerHTML="Evolution terminée à la génération #"+numeroGeneration
        bouton.target.innerHTML ="Evolution Go !"
        demarre=false
    }else{
        document.getElementById("status").innerHTML="Calcul de la génération en cours..."
        document.querySelectorAll(".vaNaitre").forEach(cellule => {
            cellule.classList.remove('vaNaitre')
            cellule.classList.add("active")
        })
        document.querySelectorAll(".vaMourir").forEach(cellule => {
            cellule.classList.remove('vaMourir')
            cellule.classList.remove("active")
        })
        let cellules = document.querySelectorAll("main>div")
        cellules.forEach(cellule => {
            let x=parseInt(cellule.getAttribute("data-x"))
            let y=parseInt(cellule.getAttribute("data-y"))
            let analyse= [
                [x-tailleCellule,y-tailleCellule],
                [x,y-tailleCellule],
                [x+tailleCellule,y-tailleCellule],
                [x-tailleCellule,y],
                [x+tailleCellule,y],
                [x-tailleCellule,y+tailleCellule],
                [x,y+tailleCellule],
                [x+tailleCellule,y+tailleCellule]
            ]
            let cellulesActives=0
            let cellulesMortes=0
            let results1=results2=[]
            for(tmp=0;tmp<analyse.length;tmp++){
                if(analyse[tmp][0]>=0&&analyse[tmp][1]>=0&&analyse[tmp][0]<=tailleX&&analyse[tmp][1]<=tailleY&&document.querySelector("div[data-x='"+parseInt(analyse[tmp][0])+"'][data-y='"+parseInt(analyse[tmp][1])+"']")&&document.querySelector("div[data-x='"+parseInt(analyse[tmp][0])+"'][data-y='"+parseInt(analyse[tmp][1])+"']").classList.contains('active')==true){
                    cellulesActives++
                    results1.push("[data-x='"+parseInt(analyse[tmp][0])+"'][data-y='"+parseInt(analyse[tmp][1])+"']")
                }else{
                    cellulesMortes++
                    results2.push("[data-x='"+parseInt(analyse[tmp][0])+"'][data-y='"+parseInt(analyse[tmp][1])+"']")
                }            
            }
            if(cellulesActives==3){
                cellule.classList.add("vaNaitre")
            }else{
                if(cellulesActives==2){
                    cellule.classList.add(cellule.classList.contains("active")?"vaNaitre":"vaMourir")
                }else{
                    cellule.classList.add("vaMourir")
                }
            }
            cellule.setAttribute("data-detailsActives",results1.join(", "))
            cellule.setAttribute("data-detailsInactives",results2.join(", "))
            cellule.setAttribute("data-actives",cellulesActives)
            cellule.setAttribute("data-mortes",cellulesMortes)
        })
        numeroGeneration++
        document.getElementById("num").innerHTML="Génération #"+numeroGeneration
        document.getElementById("status").innerHTML="Calcul de la génération terminé !<br>Préparation de la génération suivante."
        timer=setTimeout(evolution,2500)
    }
}