//Snake code by cesar
//velocidad del juego, a mayor el numero menor la velocidad
var velocidad = 50;

//tamano de la comida y cuerpo de serpiente
var tamano = 13;

//puntuacion
var score = 0;

//sonidos del juego

var comer = document.createElement("audio");

var zelda = document.createElement("audio");




class Objeto {
    constructor() {

        this.tamano = tamano;
    }

    choque(objeto) {

        var difX = Math.abs(this.x - objeto.x);
        var difY = Math.abs(this.y - objeto.y);

        if (difX >= 0 && difX < tamano && difY >= 0 && difY < tamano) {

            return true;
        } else {

            return false;
        }
    }





}

class Cola extends Objeto {

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.siguiente = null;
    }

    dibujar(ctx) {
        if (this.siguiente != null) {

            this.siguiente.dibujar(ctx);
        }
        ctx.fillStyle = "red";

        //circle
        ctx.beginPath();
        ctx.arc(this.x + 5, this.y + 5, this.tamano - 5, 0, 2 * Math.PI);
        ctx.fill();
        // ctx.fillRect(this.x, this.y, this.tamano, this.tamano);

    }

    setXY(x, y) {
        if (this.siguiente != null) {
            this.siguiente.setXY(this.x, this.y);

        }
        this.x = x;
        this.y = y;

    }

    agregar() {
        if (this.siguiente == null) {
            this.siguiente = new Cola(this.x, this.y);
        } else {

            this.siguiente.agregar();
        }
    }

    verSiguiente() {

        return this.siguiente;
    }



}

class Comida extends Objeto {

    constructor() {
        super();
        this.x = this.general();
        this.y = this.general();

    }

    general() {

        var num = (Math.floor(Math.random() * 39)) * 10;
        return num;
    }

    colocar() {

        this.x = this.general();
        this.y = this.general();

    }


    dibujar(ctx) {

        ctx.fillStyle = "yellow";
        //circle
        ctx.beginPath();
        ctx.arc(this.x + 5, this.y + 5, this.tamano - 5, 2, 2 * Math.PI);
        ctx.fill();
        // ctx.fillRect(this.x, this.y, this.tamano, this.tamano);

    }

}

//objetos del juego
var cabeza = new Cola(20, 20);

//bolita para comer
var comida = new Comida();
//agregue una comida extra
//var comida1 = new Comida();


var ejeX = true;
var ejeY = true;
var xDir = 0;
var yDir = 0;



function movimiento() {

    var nx = cabeza.x + xDir;
    var ny = cabeza.y + yDir;
    cabeza.setXY(nx, ny);

}

function control(event) {

    let cod = event.keyCode;


    //let container = 

    if (ejeX) {

        if (cod == 38) {

            yDir = -tamano;
            xDir = 0;
            ejeX = false;
            ejeY = true;
        }
        if (cod == 40) {
            yDir = tamano;
            xDir = 0;
            ejeX = false;
            ejeY = true;

        }
    }

    if (ejeY) {

        if (cod == 37) {

            yDir = 0;
            xDir = -tamano;
            ejeY = false;
            ejeX = true;

        }
        if (cod == 39) {

            yDir = 0;
            xDir = tamano;
            ejeY = false;
            ejeX = true;

        }

    }

}

//reinicia el juego  a su posicion de inicio

function finDeJuego() {

    xDir = 0;
    yDir = 0;
    ejeX = true;
    ejeY = true;
    cabeza = new Cola(20, 20);
    comida = new Comida();

    document.getElementById("fin").innerHTML = ("Juego terminado tu puntuacion es de : " + score + " puntos");
    comer.setAttribute("src", "music/loss.mp3");
    comer.setAttribute("autoplay", "music/play");
    //alert("Perdiste tu puntuacion es de :" + " " + score + " " + "puntos");
    score = 0;


}


//colicion con la pared

function choquePared() {

    if (cabeza.x < 0 || cabeza.x > 390 || cabeza.y < 0 || cabeza.y > 390) {


        finDeJuego();

    }
}

//colicion con el cuerpo
function choqueCuerpo() {

    var temp = null;
    try {
        temp = cabeza.verSiguiente().verSiguiente();

    } catch (err) {

        temp = null;

    }

    while (temp != null) {
        if (cabeza.choque(temp)) {

            //fin Juego
            finDeJuego();


        } else {

            temp = temp.verSiguiente();
        }
    }
}

//funcion para dibujar cada elemento del juego

function dibujar() {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //los objetos a dibujar
    cabeza.dibujar(ctx);
    comida.dibujar(ctx);

    //comida extra
    //  comida1.dibujar(ctx);
}


//funcion para iniciar todos los componentes de juego, el master
function main() {
    choqueCuerpo();
    choquePared();
    dibujar();
    movimiento();




    if (cabeza.choque(comida)) {

        comida.colocar();
        cabeza.agregar();
        score = score + 10;
        document.getElementById("score").innerHTML = score;
        comer.setAttribute("src", "mordisco.mp3");
        comer.setAttribute("autoplay", "autoplay");
        document.getElementById("fin").innerHTML = ("");

    }
    document.getElementById("score").innerHTML = score;



    //comida extra
    /*
    if(cabeza.choque(comida1)){
        comida1.colocar();
        cabeza.agregar();
    } */

}

//bucle para repetir el juego sin el nada funciona
setInterval("main()", velocidad);


