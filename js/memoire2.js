const Memoire = (function () {
    // varibles
    let compteur = 0
    let paireTrouves = 0
    let carte1 = ''
    let carte2 = ''
    // timer
    let timer = 0
    let interval = ''
    let cartesTotales = 0
    let meijeureJoueurFacile = 'cpu'
    let meijeurePointageFacile = 500
    let meijeureJoueurNormal = 'cpu'
    let meijeureJoueurDifficile = 'cpu'
    let meijeurePointageNormal = 800
    let meijeurePointageDifficile = 1000
    let difficulteSelection = ''
    // buttonstart
    let buttonStart = ''
    // click event
    let listenerEventValid = ''

    class Carte {
        constructor (value, id) {
            this.value = value
            this.id = id
        }

        createElement (tagName, attributes) {
            const element = document.createElement(tagName)

            for (let i = 0; i < attributes.length; i++) {
                element.setAttribute(attributes[i].name, attributes[i].value)
            }

            return element
        }

        build () {
            const div = this.createElement('div', [{ name: 'id', value: this.id }, { name: 'class', value: 'card' }])
            const divOut = this.createElement('div', [{ name: 'class', value: 'flip-container' }])

            const img = this.createElement('img', [{ name: 'src', value: 'img/' + this.value + '.jpg' }, { name: 'class', value: 'front' }])
            const imgRev = this.createElement('img', [{ name: 'src', value: 'img/revers.png' }, { name: 'name', value: this.value }, { name: 'class', value: 'back' }])
            div.appendChild(img)
            div.appendChild(imgRev)
            // hide image
            // div.children[0].classList.add('imageHide')
            divOut.appendChild(div)
            return divOut
        }
    }

    class Partie {
        createElement (tagName, attributes) {
            const element = document.createElement(tagName)

            for (let i = 0; i < attributes.length; i++) {
                element.setAttribute(attributes[i].name, attributes[i].value)
            }

            return element
        }
        menu () {
            const titule = this.createElement('h1', [])
            titule.innerHTML = 'Jeu de Mémoire'
            const main = this.createElement('main', [])
            const divContainer = this.createElement('div', [{ name: 'id', value: 'container' }])
            const form = this.createElement('form', [{ name: 'id', value: 'options' }])

            const divCantitePaires = this.createElement('div', [{ name: 'class', value: 'divFormulaire' }])
            const labelQuantite = this.createElement('label', [{ name: 'for', value: 'paires' }, { name: 'class', value: 'label-text' }])
            const quantite = this.createElement('select', [{ name: 'required', value: '' }])
            const facile = this.createElement('option', [{ name: 'value', value: 'facile' }, { name: 'id', value: 'facile' }])
            const normal = this.createElement('option', [{ name: 'value', value: 'normal' }, { name: 'id', value: 'normal' }])
            const difficil = this.createElement('option', [{ name: 'value', value: 'difficile' }, { name: 'id', value: 'difficile' }])

            facile.innerHTML = 'facile'
            quantite.appendChild(facile)

            normal.innerHTML = 'normal'
            quantite.appendChild(normal)

            difficil.innerHTML = 'difficile'
            quantite.appendChild(difficil)
            labelQuantite.innerHTML = 'Niveau'

            const divPairesTrouves = this.createElement('div', [{ name: 'class', value: 'divFormulaire' }])
            const labelPairesTrouves = this.createElement('label', [{ name: 'class', value: 'label-text' }])

            labelPairesTrouves.innerHTML = 'Paires Trouves'
            divPairesTrouves.appendChild(labelPairesTrouves)
            let paireTrouvesLabel = this.createElement('label', [{ name: 'class', value: 'result' }])
            paireTrouvesLabel.innerHTML = '0'
            divPairesTrouves.appendChild(paireTrouvesLabel)

            const divTemp = this.createElement('div', [{ name: 'class', value: 'divFormulaire' }])
            const labelTemp = this.createElement('label', [{ name: 'class', value: 'label-text' }])
            let temp = this.createElement('label', [{ name: 'class', value: 'result' }])
            temp.innerHTML = timer

            const divPuntage = this.createElement('div', [{ name: 'class', value: 'divFormulaire' }])
            const labelPuntage = this.createElement('label', [{ name: 'class', value: 'label-text' }])
            let puntage = this.createElement('label', [{ name: 'class', value: 'result' }])
            puntage.innerHTML = '500'

            const buttons = this.createElement('div', [{ name: 'class', value: 'buttons' }])
            const btnStartStop = this.createElement('button', [{ name: 'class', value: 'button' }, { name: 'type', value: 'submit' }])
            btnStartStop.innerHTML = 'Nouvelle Partie'
            const btnQuitter = this.createElement('button', [{ name: 'class', value: 'button' }])
            btnQuitter.innerHTML = 'Quitter'

            buttons.appendChild(btnStartStop)
            //   buttons.appendChild(btnQuitter)
            labelPuntage.innerHTML = 'Meilleur Pointage'

            divPuntage.appendChild(labelPuntage)
            divPuntage.appendChild(puntage)

            labelTemp.innerHTML = 'Temps'

            divTemp.appendChild(labelTemp)
            divTemp.appendChild(temp)

            divCantitePaires.appendChild(labelQuantite)
            divCantitePaires.appendChild(quantite)
            form.appendChild(divCantitePaires)
            form.appendChild(divPairesTrouves)
            form.appendChild(divTemp)
            form.appendChild(divPuntage)
            form.appendChild(buttons)
            main.appendChild(divContainer)
            main.appendChild(form)
            document.body.appendChild(titule)
            document.body.appendChild(main)
        }

        melanger (numeroCartes, container) {
            let arryTest = []
            let arryTest2 = []
            let arrayId = []
            for (let i = 0; i < numeroCartes; i++) {
                arryTest[i] = i
                arryTest2[i] = i
            }

            for (let i = 0; i < numeroCartes; i++) {
                arryTest.push(arryTest2[i])
            }
            for (let i = 0; i < numeroCartes * 2; i++) {
                arrayId[i] = i
            }

            let id1 = arrayId.splice(0, (arrayId.length / 2))

            let id2 = arrayId.splice(0, arrayId.length)

            arryTest.sort(function () { return Math.random() - 0.5 })

            let x = arryTest.splice(0, (arryTest.length / 2))
            let y = arryTest.splice(0, arryTest.length)

            for (let i = 0; i < numeroCartes; i++) {
                let uneCarte = new Carte(x[i], id1[i])

                container.appendChild(uneCarte.build())
            }
            arryTest.sort(function () { return Math.random() - 0.5 })
            for (let i = 0; i < numeroCartes; i++) {
                let carteDeux = new Carte(y[i], id2[i])

                container.appendChild(carteDeux.build())
            }

            return container
        }

        partie (numeroPaires, main) {
            this.melanger(numeroPaires, main)
        }
    }
    function hideAfficherCarte (image1) {
        if (image1.parentNode.style.transform === 'rotateY(180deg)') {
            image1.parentNode.style.transform = 'rotateY(0deg)'
        } else {
            image1.parentNode.style.transform = 'rotateY(180deg)'
        }
    }

    function validation (carteR) {
        cartesTotales = document.body.children[1].children[0].children.length
        let carte = carteR

        if (carte.parentNode.style.transform !== 'rotateY(180deg)') {
            switch (compteur) {
            case 0:
                if (carte.parentNode.style.transform !== 'rotateY(180deg)') {
                    if (carte1 === '' || carte.parentNode.id !== carte1.parentNode.id) {
                        carte1 = carte

                        hideAfficherCarte(carte1)

                        compteur += 1
                    }
                }

                break
            case 1:
                compteur += 1
                carte2 = carte
                if (carte2 === '' || carte1.parentNode.id !== carte.parentNode.id) {
                    if (carte1.parentNode.id !== carte2.parentNode.id) {
                        if (carte1.name === carte2.name) {
                            hideAfficherCarte(carte2)
                            paireTrouves += 1
                            document.body.children[1].children[1].children[1].children[1].innerHTML = paireTrouves
                            compteur = 0
                        } else {
                            hideAfficherCarte(carte2)
                            const timeOut = function () {
                                hideAfficherCarte(carte1)
                                hideAfficherCarte(carte2)
                                timer += 2
                                compteur = 0
                            }
                            setTimeout(timeOut, 400)
                        }
                    }
                }

                break

            case 2:

                if (carte1.name !== carte2.name) {
                    carte1.parentNode.style.transform = 'rotateY(180deg)'
                    carte2.parentNode.style.transform = 'rotateY(180deg)'
                }

                compteur = 0
                break
            }
        }

        cartesTotales = cartesTotales / 2

        if (paireTrouves === cartesTotales) {
            difficulteSelection = document.body.children[1].children[1].children[0].children[1].value
            let c = document.body.children[1].children[0]
            buttonStart = document.body.children[1].children[1].children[4].children[0]
            buttonStart.innerHTML = 'Nouvelle Partie'
            alert('tu as gagne')
            if (difficulteSelection === 'facile') {
                if (timer < meijeurePointageFacile) {
                    clearInterval(interval)
                    meijeurePointageFacile = document.body.children[1].children[1].children[3].children[1]
                    meijeurePointageFacile.innerHTML = timer
                    meijeurePointageFacile = timer
                    let jF = document.body.children[1].children[2].children[1]

                    meijeureJoueurFacile = prompt('new record facile !,ecrit ton nom')

                    jF.innerHTML = meijeureJoueurFacile.substr(0, 6)
                }
            }

            if (difficulteSelection === 'normal') {
                if (timer < meijeurePointageNormal) {
                    clearInterval(interval)
                    meijeurePointageNormal = document.body.children[1].children[1].children[3].children[1]
                    meijeurePointageNormal.innerHTML = timer
                    meijeurePointageNormal = timer
                    let jN = document.body.children[1].children[2].children[1]
                    meijeureJoueurNormal = prompt('new record normal !, ecrit ton nom')
                    jN.innerHTML = meijeureJoueurNormal.substr(0, 6)
                }
            }

            if (difficulteSelection === 'difficile') {
                if (timer < meijeurePointageDifficile) {
                    clearInterval(interval)
                    meijeurePointageDifficile = document.body.children[1].children[1].children[3].children[1]
                    meijeurePointageDifficile.innerHTML = timer
                    meijeurePointageDifficile = timer
                    let jD = document.body.children[1].children[2].children[1]
                    meijeureJoueurDifficile = prompt('new record difficile!, ecrit ton nom')
                    jD.innerHTML = meijeureJoueurDifficile.substr(0, 6)
                }
            }

            clearInterval(interval)

            c.removeEventListener('click', listenerEventValid, true)
            resetJeu()
        }
    }

    function removeAllChilds (main) {
        let a = document.getElementById(main)
        while (a.hasChildNodes()) {
            a.removeChild(a.firstChild)
        }
    }

    function eventValide (event) {
        if (event.target.parentNode.className === 'card') {
            validation(event.target)
            // console.log(event.target)
        }
    }

    function time () {
        let lblTime = document.body.children[1].children[1].children[2].children[1]
        function x () {
            timer++
            lblTime.innerHTML = timer
        }

        interval = setInterval(x, 1000)
    }
    function difficulte (option, containerCartes) {
        let newJeu = ''
        let joueurDifficulte = document.body.children[1].children[2].children[1]
        let c = document.body.children[1].children[0]
        time()

        switch (option) {
        case 'facile':
            paireTrouves = 0

            c.removeEventListener('click', listenerEventValid, true)
            joueurDifficulte.setAttribute('class', 'facile')
            removeAllChilds(containerCartes.id)
            newJeu = new Partie()
            newJeu.partie(4, containerCartes)
            console.log(containerCartes)
            let f = document.body.children[1].children[1].children[3].children[1]
            let jF = document.body.children[1].children[2].children[1]
            f.innerHTML = meijeurePointageFacile
            jF.innerHTML = meijeureJoueurFacile.substr(0, 6)
            break

        case 'normal':
            paireTrouves = 0

            c.removeEventListener('click', listenerEventValid, true)
            joueurDifficulte.setAttribute('class', 'normal')
            removeAllChilds(containerCartes.id)
            newJeu = new Partie()
            newJeu.partie(6, containerCartes)

            let n = document.body.children[1].children[1].children[3].children[1]
            let jN = document.body.children[1].children[2].children[1]
            jN.innerHTML = meijeureJoueurNormal.substr(0, 6)
            n.innerHTML = meijeurePointageNormal

            break

        case 'difficile':
            paireTrouves = 0

            c.removeEventListener('click', listenerEventValid, true)
            joueurDifficulte.setAttribute('class', 'difficile')
            removeAllChilds(containerCartes.id)
            newJeu = new Partie()
            newJeu.partie(10, containerCartes)
            console.log(containerCartes)

            let d = document.body.children[1].children[1].children[3].children[1]
            let jD = document.body.children[1].children[2].children[1]
            d.innerHTML = meijeurePointageDifficile
            jD.innerHTML = meijeureJoueurDifficile.substr(0, 6)

            break
        }
    }

    function resetJeu () {
        timer = 0
        paireTrouves = 0
    }

    function meijeureJoueur () {
        const tableauJoueur = document.createElement('div')
        const h3 = document.createElement('h3')
        const p = document.createElement('p')
        h3.innerHTML = 'Meilleur Joueur'
        p.innerHTML = 'CPU'
        tableauJoueur.setAttribute('class', 'scores')
        tableauJoueur.appendChild(h3)
        tableauJoueur.appendChild(p)
        p.setAttribute('class', 'facile')

        document.body.children[1].appendChild(tableauJoueur)
    }

    function cartesShow () {
        const body = document.body.children[1].children[2]
        const divCartesContainer = document.createElement('div')
        divCartesContainer.setAttribute('id', 'cartesPosibles')
        const divCartes = document.createElement('div')
        const h3Titule = document.createElement('h3')
        h3Titule.innerHTML = 'Pokemon savauge'
        divCartes.appendChild(h3Titule)
        for (let i = 0; i < 10; i++) {
            const img = document.createElement('img')

            img.setAttribute('src', 'img/' + i + '.jpg')
            img.setAttribute('class', 'showCartes')
            divCartes.appendChild(img)
        }
        divCartesContainer.appendChild(divCartes)
        body.appendChild(divCartesContainer)
    }

    function quitterJeu () {
        const body = document.body.children[1].children[2]
        const divButtonQuitter = document.createElement('div')
        const buttonQuitter = document.createElement('button')
        buttonQuitter.addEventListener('click', function () {
            buttonStart.innerHTML = 'Nouvelle Partie'
            document.body.children[1].children[1].children[1].children[1].innerHTML = 0
            clearInterval(interval)
            document.body.children[1].children[1].children[2].children[1].innerHTML = 0
            removeAllChilds(document.body.children[1].children[0].id)
        })
        buttonQuitter.setAttribute('id', 'buttonQuitter')
        divButtonQuitter.setAttribute('id', 'divBtnQuitter')
        buttonQuitter.innerHTML = 'QUITTER'
        divButtonQuitter.appendChild(buttonQuitter)
        body.appendChild(divButtonQuitter)
    }

    function creditos () {
        const body = document.body.children[1].children[2]
        const divCredits = document.createElement('div')
        const titleCredits = document.createElement('h4')
        titleCredits.innerHTML = 'Created By '
        const aCesar = document.createElement('a')
        aCesar.setAttribute('href', 'https://www.facebook.com/cesar.trevinogarcia')
        aCesar.innerHTML = 'Cesar'
        const aFrancis = document.createElement('a')
        aFrancis.innerHTML = '/Francis'
        aFrancis.setAttribute('href', 'https://www.facebook.com/BibeauIII')
        divCredits.setAttribute('id', 'creditos')
        divCredits.appendChild(titleCredits)
        divCredits.appendChild(aCesar)
        divCredits.appendChild(aFrancis)

        body.appendChild(divCredits)
    }

    return {
        init: function () {
            let jeu = new Partie()
            jeu.menu()

            const containerCartes = document.body.children[1].children[0]
            let button = document.body.children[1].children[1].children[1].children[1]

            buttonStart = document.body.children[1].children[1].children[4].children[0]
            const menu = document.body.children[1].children[1]
            jeu.partie(4, containerCartes)

            meijeureJoueur()

            button.innerHTML = paireTrouves

            menu.addEventListener('submit', function (event) {
                if (buttonStart.innerHTML !== 'Arreter') {
                    let option = document.body.children[1].children[1].children[0].children[1].value
                    buttonStart.innerHTML = 'Arreter'
                    time()

                    listenerEventValid = function (event) {
                        eventValide(event)
                    }
                    paireTrouves = 0
                    document.body.children[1].children[1].children[1].children[1].innerHTML = paireTrouves
                    containerCartes.addEventListener('click', listenerEventValid)
                    resetJeu()
                    clearInterval(interval)
                    difficulte(option, containerCartes)

                    event.preventDefault()
                } else {
                    buttonStart.innerHTML = 'Nouvelle Partie'

                    resetJeu()

                    containerCartes.removeEventListener('click', listenerEventValid)

                    clearInterval(interval)
                    event.preventDefault()
                }
                event.preventDefault()
            }, false)
            cartesShow()
            quitterJeu()
            creditos()
        }

    }
})()

window.addEventListener('DOMContentLoaded', function loaded (event) {
    window.removeEventListener('DOMContentLoaded', loaded, false)

    // instance d'object Module memoire
    Memoire.init()
}, false)
