'use strict'
const DadosGame = (function () {

    let pointage = 0
    let turn = 1

    class Dado {

        constructor(numero) {
            this.numero = numero
        }

        build() {


            let img = createElement('img', [{ name: 'class', value: ('dado', validation(this.numero)) }, { name: 'name', value: this.numero }, { name: 'src', value: 'img/dee/' + this.numero + '.png' }, { name: 'alt', value: 'dado' }])

            return img
        }

    }

    class Table {

        constructor(players) {
            this.players = players
        }

        createPlayers() {

            let div = createElement('div', [{ name: 'id', value: 'players' }])
            let h2 = createElement('h2', [])
            let divPlayersContainer = createElement('div', [{ name: 'id', value: 'containerP' }])
            h2.innerHTML = 'players'

            div.appendChild(h2)
            for (let i = 0; i < this.players; i++) {
                let player = createElement('div', [{ name: 'class', value: 'player' }, { name: 'id', value: 'player_' + (i + 1) }])
                let name = createElement('label', [{ name: 'id', value: 'namePlayer' + (i + 1) }])
                name.innerHTML = 'Player ' + (i + 1) + ' : '
                let label = createElement('label', [])
                label.innerHTML = 0
                player.appendChild(name)
                player.appendChild(label)
                divPlayersContainer.appendChild(player)

            }

            divPlayersContainer.children[0].setAttribute('class', 'turnPly')
            div.appendChild(divPlayersContainer)
            return div

        }

        build(container) {

            let divContainersDe = createElement('div', [{ name: 'id', value: 'containersDe' }])

            let hand = createElement('div', [{ name: 'id', value: 'hand' }])
            let titleHand = createElement('h3', [])


            let pointage = createElement('div', [{ name: 'id', value: 'pointageCourrant' }])
            let h3Points = createElement('h3', [])
            let scoreCourrante = createElement('label', [{ name: 'id', value: 'pts' }])

            h3Points.innerHTML = 'pointage courrante '
            scoreCourrante.innerHTML = '0'
            pointage.appendChild(h3Points)
            pointage.appendChild(scoreCourrante)


            // hand.appendChild(titleHand)
            titleHand.innerHTML = 'Mano'

            let table = createElement('div', [{ name: 'id', value: 'table' }])
            let titleTable = createElement('h3', [])
            titleTable.innerHTML = 'Mesa'
            //table.appendChild(titleTable)

            let titleDe = createElement('h2', [])
            titleDe.innerHTML = 'TABLERO'

            let menu = createElement('div', [{ name: 'id', value: 'menu' }])

            let titleMenu = createElement('h3', [])
            titleMenu.innerHTML = 'Menu'

            let btnContainer = createElement('div', [{ name: 'id', value: 'btnContainer' }])

            let btnAccept = createElement('button', [{ name: 'class', value: 'btnMenu' }, { name: 'id', value: 'accept' }])
            btnAccept.innerHTML = 'Tirar'

            let btnCancel = createElement('button', [{ name: 'class', value: 'btnMenu' }, { name: 'id', value: 'cancel' }])
            btnCancel.innerHTML = 'Tomar'

            let pontaigeContainer = createElement('div', [{ name: 'id', value: 'pointageContainer' }])
            let lblPointTableau = createElement('p', { name: 'id', value: 'pointTableau' })
            lblPointTableau.innerHTML = 'Pointage Maintenant : '
            let lblPointGarde = createElement('p', { name: 'id', value: 'pointGarde' })
            lblPointGarde.innerHTML = 'Pointage Garde : '

            pontaigeContainer.appendChild(lblPointTableau)
            pontaigeContainer.appendChild(lblPointGarde)


            btnContainer.appendChild(btnAccept)
            btnContainer.appendChild(btnCancel)

            menu.appendChild(titleMenu)
            menu.appendChild(btnContainer)
            //  menu.appendChild(pontaigeContainer)

            // divContainersDe.appendChild(titleDe)
            divContainersDe.appendChild(hand)
            divContainersDe.appendChild(table)
            divContainersDe.appendChild(pointage)


            container.appendChild(divContainersDe)
            //jugadores
            container.appendChild(this.createPlayers())
            container.appendChild(menu)



        }
    }


    function changeTurne(s) {

        let players = document.getElementById('containerP')
        let p = players.children[turn - 1]

        if (turn === players.children.length) {
            players.children[players.children.length - 1].setAttribute('class', 'player')
            turn = 0
        }

        players.children[(turn - 1) < 0 ? 0 : turn - 1].setAttribute('class', 'player')

        players.children[turn].setAttribute('class', 'turnPly')

        if (s) {

            turn = turn + 1
            players.children[turn]
        }


    }

    function prendrePoints() {
        let plyr = document.getElementsByClassName('turnPly')
        let x = parseInt(plyr.item(0).children[1].innerHTML, 10)
        plyr.item(0).children[1].innerHTML = pointage + x
        console.log(x)

    }

    function createElement(tagName, attributes) {
        const element = document.createElement(tagName)

        for (let i = 0; i < attributes.length; i++) {
            element.setAttribute(attributes[i].name, attributes[i].value)
        }

        return element
    }

    function getRandomArbitrary() {
        return Math.round(Math.random() * (6 - 1) + parseInt(1));
    }


    function changeScore(score) {

        let x = document.getElementById('pts')
        x.innerHTML = score
    }


    function choisir(quantite, hand, table) {
        console.log(quantite)

        let des = quantite - table.children.length

        console.log(des)
        if (table.children.length === quantite) {
            des = quantite
            removeAllChilds('table')

        }

        for (let i = 0; i < des; i++) {

            let x = getRandomArbitrary()

            if (x === 1 || x === 5) {

                let dado = new Dado(x)
                table.appendChild(dado.build())

            } else {
                let dado = new Dado(x)
                hand.appendChild(dado.build())
            }

        }


        if (hand.children.length === des) {

            des = 5
            removeAllChilds('table')

            let fullAll = createElement('h3', [{ name: 'id', value: 'fullAll' }])
            fullAll.innerHTML = 'FULL ALL!'
            table.appendChild(fullAll)

        }


    }

    function validation(numero) {
        let color = 'dado'

        switch (numero) {

            case 1: {
                color = 'dadoRed'
                break
            }

            case 5: {
                color = 'dadoBlue'
            }


        }

        return color

    }


    function evaluationPointage(quantite, hand, table) {

        let container = []

        let contador = 0

        let des = quantite - table.children.length

        let pt = 0
        //5

        if (table.children.length === quantite) {

            removeAllChilds('table')
            des = 5

        }
        console.log(des)
        for (let i = 0; i < des; i++) {

            let dado = new Dado(getRandomArbitrary())
            container.push(dado)

        }

        for (let i = 0; i < container.length; i++) {

            for (let j = 0; j < container.length; j++) {

                if (container[i].numero === container[j].numero) {
                    contador++

                }

            }

            switch (contador) {

                case 3:

                    pt = container[i].numero * 100
                    console.log(pointage)
                    changeScore(pointage)
                    table.appendChild(container[i].build())
                    break;

                case 4:

                    pt = (container[i].numero * 100) * 2

                    console.log(pointage)
                    changeScore(pointage)
                    table.appendChild(container[i].build())
                    break;

                case 5:

                    pt = ((container[i].numero * 100) * 2) * 2
                    console.log(pointage)
                    changeScore(pointage)
                    table.appendChild(container[i].build())
                    break;

                default:

                    if (container[i].numero === 1 || container[i].numero === 5) {

                        table.appendChild(container[i].build())
                        if (container[i].numero === 1) {
                            pointage = pointage + 100
                            changeScore(pointage)
                            console.log(pointage)
                        } else {
                            pointage = pointage + 50
                            changeScore(pointage)
                            console.log(pointage)

                        }

                    } else {
                        hand.appendChild(container[i].build())

                    }

                    if (hand.children.length === des) {

                        des = 5
                        removeAllChilds('table')

                        let fullAll = createElement('h3', [{ name: 'id', value: 'fullAll' }])
                        fullAll.innerHTML = 'FULL ALL!'

                        table.appendChild(fullAll)
                        pointage = 0
                        changeScore(pointage)
                        changeTurne('true')

                    }

            }


            contador = 0
        }
        changeScore(pointage + pt)
        pointage = pointage + pt

    }

    function removeAllChilds(main) {
        let a = document.getElementById(main)
        while (a.hasChildNodes()) {
            a.removeChild(a.firstChild)
        }
    }



    return {
        init: function (container) {
            let x = container
            let table = new Table(3)
            table.build(x)

            let hand = document.getElementById('hand')
            let mesa = document.getElementById('table')

            let btnAccept = document.getElementById('accept')
            let btnCancel = document.getElementById('cancel')

            btnCancel.addEventListener('click', function () {

                prendrePoints()
                changeTurne('true')

            }, false)


            btnAccept.addEventListener('click', function () {

                if (hand.children) {
                    removeAllChilds('hand')
                }

                if (document.getElementById('fullAll')) {
                    removeAllChilds('table')
                }
                //choisir(5, hand, mesa)
                evaluationPointage(5, hand, mesa)
                // pointageCalculate(mano, score)
            }, false)
            // x.appendChild(melanger)
        }
    }
})()

window.addEventListener('DOMContentLoaded', function loaded(event) {
    window.removeEventListener('DOMContentLoaded', loaded, false)

    // instance d'object Module memoire
    DadosGame.init(document.getElementById('container'));

}, false)