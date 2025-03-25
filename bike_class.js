class Obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }
    draw(){
        let img = new Image()
        img.src = this.a
        des.drawImage(img,this.x,this.y,this.w,this.h)
    }
}
// class Bg extends Obj{
//     mov_bg(){
//         this.y += 5
//         if(this.y >= 710){
//             this.y = 0
//         }
//     }
//     mov_bg2(){
//         this.y += 5
//         if(this.y >= 710){
//             this.y = 0
//         }
//     }
//     des_bg_img(){
//         let img = new Image()
//         img.src = this.a
//         des.drawImage(img, this.x, this.y, this.w, this.h)
//     }
// }
class Bike extends Obj{
    dir = 0
    pts = 0
    vida = 5
    frame = 1
    tempo = 0

    des_bike_img(){
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    }

    anim(nome){
        this.tempo +=1
        if(this.tempo > 12){
            this.tempo = 0
            this.frame += 1
        }
        if(this.frame>4){
            this.frame= 1
        }
        this.a = "img/"+nome+this.frame+".png"
    }
    mov_bike(){
        this.x += this.dir
        if(this.x <=2){
            this.x = 2
        }else if(this.x >= 416){
            this.x = 416
        }
    }
    point(objeto){
        if((objeto.y>=680)&&(objeto.y <= 684)){
            return true
        }else{
            false
        }
    }
    colid(objeto){
        if((this.x < objeto.x + objeto.w)&&
          (this.x + this.w > objeto.x)&&
          (this.y < objeto.y + objeto.h)&&
          (this.y + this.h > objeto.y)){
            return true
        }else{
            false
        }
    }
}
class Bike2 extends Bike{
    mov_bike2(){
        this.y += 5
        if(this.y >= 780){
            this.recomeca()
        }else if((this.pts > 8) || (this.y >= 780)){
            this.y += 10
            this.recomeca()
        }else if((this.pts > 20) || (this.y >= 780)){
            this.y += 20
            this.recomeca()
        }
    }
    
    recomeca(){
        this.y = -100
        this.x = Math.floor(Math.random() * ((416 - 2 + 1) + 2)) // quando o carro sair da tela
    }
}
class Text{
    des_text(text,x,y,cor,font){
        des.fillStyle = cor
        des.lineWidth = '5'
        des.font = font
        des.fillText(text,x,y)
    }
}