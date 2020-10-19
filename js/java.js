//Snake code by cesar
//velocidad del juego, a mayor el numero menor la velocidad
/*let velocidad = document.getElementById("velocidad")*/

//imports 
//import {Objeto,Cola,Comida} from './Objetos'


let velocidad = 100
let on = false



//tamano de la comida y cuerpo de serpiente
let tamano = 10

let dificultad = 5
let subidon = 0


//puntuacion
let score = 0

//sonidos del juego

let comer = document.createElement("audio");
let zelda = document.createElement("audio");


let UP_KEY = false



class Objeto {
    constructor() {

        this.tamano = tamano;
    }

    choque(objeto) {

        let difX = Math.abs(this.x - objeto.x);
        let difY = Math.abs(this.y - objeto.y);

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
        //ctx.fillRect(this.x, this.y, this.tamano, this.tamano);
        ctx.fill();

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

        let num = (Math.floor(Math.random() * 34)) * 10;
        return num;
    }

    colocar() {

        this.x = this.general();
        this.y = this.general();

    }


    dibujar(ctx) {

        ctx.fillStyle = "white";
        //circle
        ctx.beginPath();
        //ctx.arc(this.x + 5, this.y + 5, this.tamano - 5, 2, 2 * Math.PI);
        ctx.fillRect(this.x, this.y, this.tamano, this.tamano);
        ctx.fill();

    }

}

//objetos del juego
let cabeza = new Cola(10, 10);

//bolita para comer
let comida = new Comida();
//agregue una comida extra
//var comida1 = new Comida();


let ejeX = true;
let ejeY = true;
let xDir = 0;
let yDir = 0;



function movimiento() {

    let nx = cabeza.x + xDir;
    let ny = cabeza.y + yDir;
    cabeza.setXY(nx, ny);

}

let cod = 0

function control(event) {

    cod = event.keyCode;




    if (ejeX) {

        if (cod == 38) {

            yDir = -tamano;
            xDir = 0;
            ejeX = false;
            ejeY = true;

            console.log('UP')
        }
        if (cod == 40) {
            yDir = tamano;
            xDir = 0;
            ejeX = false;
            ejeY = true;

            console.log('DOWN')
        }
    }

    if (ejeY) {

        if (cod == 37) {

            yDir = 0;
            xDir = -tamano;
            ejeY = false;
            ejeX = true;

            console.log('LEFT')
        }
        if (cod == 39) {

            yDir = 0;
            xDir = tamano;
            ejeY = false;
            ejeX = true;
            console.log('RIGHT')

        }

    }

}

//reinicia el juego  a su posicion de inicio

function finDeJuego() {

    xDir = 0
    yDir = 0
    ejeX = true
    ejeY = true
    cabeza = new Cola(50, 50)
    comida = new Comida()

    document.getElementById("fin").innerHTML = ("Game Over : " + score + " pts");
    comer.setAttribute("src", "music/loss.mp3");
    comer.setAttribute("autoplay", "music/play");
    //alert("Perdiste tu puntuacion es de :" + " " + score + " " + "puntos");
    score = 0
    velocidad = 150
    subidon = 0
    dificultadVelocidad(score, velocidad, subidon, true)


}


//colicion con la pared

function choquePared() {

    if (cabeza.x < 0 || cabeza.x > 340 || cabeza.y < 0 || cabeza.y > 340) {


        finDeJuego();

    }
}

function dificultadVelocidad(velocidad, cpt, on) {



    if (cpt >= 5 && on == false) {
        clearInterval(interval)
        velocidad = velocidad - dificultad
        setInterval("main()", 150);
        console.log("aumento velocidad = " + velocidad)

    }

    if (on) {
        velocidad = 150
        setInterval("main()", velocidad);
    }

    subidon++
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
    //comida1.dibujar(ctx);
}


//funcion para iniciar todos los componentes de juego, *  MASTER
let UP, DOWN, LEFT, RIGHT

function main() {


    UP = document.getElementById("UP")
    DOWN = document.getElementById("DOWN")
    LEFT = document.getElementById("LEFT")
    RIGHT = document.getElementById("RIGHT")

    UP.addEventListener('touchstart', function () {

        if (ejeX) {

            yDir = -tamano;
            xDir = 0;
            ejeX = false;
            ejeY = true;
            console.log('UP')
        }

    })

    DOWN.addEventListener('touchstart', function () {

        if (ejeX) {
            yDir = tamano;
            xDir = 0;
            ejeX = false;
            ejeY = true;
            console.log('DOWN')
        }

    })

    LEFT.addEventListener('touchstart', function () {

        if (ejeY) {
            yDir = 0;
            xDir = -tamano;
            ejeY = false;
            ejeX = true;

            console.log('LEFT')
        }

    })

    RIGHT.addEventListener('touchstart', function () {

        if (ejeY) {
            yDir = 0;
            xDir = tamano;
            ejeY = false;
            ejeX = true;

            console.log('RIGHT')
        }

    })

    choqueCuerpo();
    choquePared();
    dibujar();
    movimiento();




    if (cabeza.choque(comida)) {

        comida.colocar();
        cabeza.agregar();
        score = score + 10;
        document.getElementById("score").innerHTML = score;
        comer.setAttribute("src", "music/mordisco.mp3");
        comer.setAttribute("autoplay", "music/play");
        document.getElementById("fin").innerHTML = ("");
        /* dificultadVelocidad(score,velocidad)*/
        dificultadVelocidad(velocidad, subidon, false)
        console.log(score)

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




