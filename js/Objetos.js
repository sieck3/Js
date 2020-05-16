
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
    test(){
        return console.log('HI')
    }

}

export class Cola extends Objeto {

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

export class Comida extends Objeto {

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
module.exports = Objeto