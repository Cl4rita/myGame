let des = document.getElementById('des').getContext('2d')

let bikeModel = new Obj(160,390,100,100,'./img/beginningBikeBG.png')
let bike = new Bike(225,550,60,100,'./img/bikeNoBG_1.png')
let bg = new Bike(0,0,500,700,'./img/garden2.jpeg')
let stone = new Bike2(400,-40,45,100,'./img/stoneNoBG.png')
let wood = new Bike2(200,-280,45,100,'./img/logWoodNoBG.png')
let arbusto = new Bike(0,0,500,200,'./img/arbustoBg_1.png')
let arbusto2 = new Bike(0,500,500,200,'./img/arbusto2Bg.png')
let arbusto3 = new Bike(300,450,25,25,'./img/arbustoRedondo2Bg.png')
let flor = new Bike(115,260,60,60,'./img/flower1BG.png')
let flor2 = new Bike(315,335,65,65,'./img/flower2BG.png')
let flor3 = new Bike(135,355,40,40,'./img/flower3BG.png')
let flor4 = new Bike(330,265,40,40,'./img/flower3BG.png')

let t1 = new Text()
let t2 = new Text()
let t3 = new Text()
let t4 = new Text()
let t5 = new Text()
let t6 = new Text()
let t7 = new Text()
let t8 = new Text()
let t9 = new Text()
let t10 = new Text()
let t11 = new Text()

let motor = new Audio('./img/motor.wav')
let batida = new Audio('./img/batida.mp3')
motor.volume = 0.8
motor.loop = true
batida.volume = 0.8

let jogar = true
let jogo = false
let faseAtual = 1

document.addEventListener('keydown',(e)=>{
    // console.log(e.key)
    if(e.key === 'a'){
        bike.dir -= 5
    }else if(e.key === 'd'){
        bike.dir += 5
    }
})
document.addEventListener('keyup', (e)=>{
    if(e.key === 'a'){
        bike.dir = 0
    }else if(e.key === 'd'){
        bike.dir = 0
    }
})
document.addEventListener('keypress', (e)=>{
    if(e.key === 'g'){
        jogo = true
        // som1.play()
        // motor.pause()
    }else if(e.key === 'p'){
        bike.dir = 0
        jogo = false
        // som1.pause()
        // som2.play()
    }
})
function game_over(){
    if(bike.vida <=0){
        jogar = false
        motor.pause()
        faseAtual = 1
        // música com o jogo parado
    }
}
function pontos(){
    if(bike.point(stone)){
        bike.pts += 1
    }else if(bike.point(wood)){
        bike.pts += 1
    }
    if(bike.pts >= 10 && faseAtual === 1){
        faseAtual = 2
    }else if(bike.pts >= 30 && faseAtual === 2){
        faseAtual = 3
    }else if(bike.pts >= 50  && faseAtual === 3){
        faseAtual = 4
    }else if(bike.pts >= 100  && faseAtual === 4){  
        alert("Parabéns! Completasse o jogo. Reinicie!")
        jogar = false
    }
}
function colisao(){
    if(bike.colid(stone)){
        bike.vida -= 1
        stone.recomeca()
        batida.play()
    }else if(bike.colid(wood)){
        bike.vida -= 1
        wood.recomeca()
        batida.play()
    } 
}
function desenharInicio(){
    bikeModel.draw()
    arbusto3.draw()
    arbusto.draw()
    arbusto2.draw()
    t8.des_text('Por: Ana Clara Furtado ® ™',180,610,'magenta','12px Times')
    t9.des_text('Clique g para jogar e p para pausar',130,335,'darkred','18px Times')
    flor.draw()
    flor2.draw()
    flor3.draw()
    flor4.draw()
    t6.des_text('Bem-vinda(o) ',140,160,'pink','42px Times') 
    t6.des_text('Para mover, clique A e D ',170,280,'white','16px Times')
    t7.des_text('Evite os dois obstáculos ',175,390,'red','16px Times')
}
function desenha(){
    t1.des_text('Pontos: ',360,22,'pink','26px Times')
    t2.des_text(bike.pts,442,24,'red','26px Times')
    t3.des_text('Vida: ',40,24,'pink','26px Times')
    t4.des_text(bike.vida,100,24,'red','26px Times')

    if(jogar){
        bg.des_bike_img()
        // bg2.des_bg_img()
        // bg3.des_bg_img()
        t1.des_text('Pontos: ',360,22,'pink','26px Times')
        t2.des_text(bike.pts,442,24,'red','26px Times')
        t3.des_text('Vida: ',40,24,'pink','26px Times')
        t4.des_text(bike.vida,100,24,'red','26px Times')
        t10.des_text('Fase: ',200,24,'pink','26px Times')
        t11.des_text(faseAtual,260,24,'red','26px Times')
        stone.des_bike_img()
        wood.des_bike_img()
        bike.des_bike_img()
        console.log(faseAtual)
    }else{
        t5.des_text('Game Over',140,340,'red','46px Times')
        t8.des_text('Aperte F5 e tente novamente',140,540,'pink','20px Times')
        flor.draw()
        flor2.draw()
        flor3.draw()
        flor4.draw()
        arbusto2.draw()
    }  
}
function atualiza(){
    if(jogar){
        // bg.mov_bg()
        // bg2.mov_bg2()
        // bg3.mov_bg2()
        motor.play()
        stone.mov_bike2()
        wood.mov_bike2()
        bike.mov_bike()
        bike.anim('bikeNoBG_')
        arbusto.anim('arbustoBg_')
        pontos()
        colisao()
        game_over()
    }
    if(faseAtual === 2){
        stone.y += 7
        wood.y += 7
    }else if(faseAtual === 3){
        stone.y += 9
        wood.y += 9
    }else if(faseAtual === 4){
        stone.y += 10
        wood.y += 10
    }
}
function main(){
    if(jogo == false){
        des.clearRect(0,0,500,700)
        desenharInicio()
        requestAnimationFrame(main)
    }else if(jogo == true){
        des.clearRect(0,0,500,700)
        desenha()
        atualiza()
        requestAnimationFrame(main)
    }
}

main()