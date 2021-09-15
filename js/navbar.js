'use strict'
const NavBar = (function () {
    /* <img src="img/icone/hombre.png" alt="iconeHome"> */
    const LIENS = [
        {
            label: 'Cesar Trevino',
            lien: 'index.html',
            img: 'hombre.png'
        }
        ,
        {
            label: 'Accueil',
            lien: 'index.html',
            img: 'navegador.png'
        },
        {
            label: 'Projets',
            lien: 'projets.html',
            img: 'lista.png'
        }
        ,
        {
            label: 'Contact',
            lien: 'contact.html',
            img: 'charla.png'
        }
    ]

    function createElement(tagName, attributes) {
        const element = document.createElement(tagName)

        for (let i = 0; i < attributes.length; i++) {
            element.setAttribute(attributes[i].name, attributes[i].value)
        }

        return element
    }

    function creationNavbar(container) {

        for (let i = 0; i < LIENS.length; i++) {
            console.log(LIENS[i].label)
            let a = createElement('a', [{ name: 'href', value: LIENS[i].lien }])
            let img = createElement('img', [{ name: 'src', value: 'img/icone/' + LIENS[i].img }])
            let label = createElement('label', [])
            label.innerHTML = LIENS[i].label
            if (i !== 0) {
                a.appendChild(img)
            } else {

                let imgIcone = createElement('img', [{ name: 'src', value: 'img/icone/' + 'hombre.png' }])
                
                a.setAttribute('id', 'icone_principale')
                a.appendChild(imgIcone)
                
            }
            //a.innerHTML =  LIENS[i].label
            // a.appendChild(label)
            //  a.innerHTML = LIENS[i].label
            let text = document.createTextNode(LIENS[i].label)
            a.appendChild(text)
            console.log(a)

            container.appendChild(a)
        }

        /*
                for (let i = 0; i < LIENS.length;i ++) {
                    let a = this.createElement('a', [{ name: 'href', value: this.id }, { name: 'class', value: 'card' }])
                    container.appendChild(img)
                }*/
        return container
    }

    return {
        init: function (container) {
            let x = container
            const URL = window.location;
            let URL_courrante = URL.href.slice(URL.href.indexOf('/Js/') + 4, URL.href.length)


            x = creationNavbar(container)
            x.children[0].setAttribute('class', 'select')

            for (let i = 0; i < x.children.length; i++) {
                if (x.children[i].href.slice(x.children[i].href.indexOf('/Js/') + 4, x.children[i].href.length) === URL_courrante) {

                    // console.log('Response: ', x.children[i].innerHTML)
                    x.children[i].setAttribute('class', (URL_courrante !== '' ? 'select' : ''))
                    console.log(x,"lista");


                }
            }

        }
    }
})()

window.addEventListener('DOMContentLoaded', function loaded(event) {
    window.removeEventListener('DOMContentLoaded', loaded, false)

    // instance d'object Module memoire
    NavBar.init(document.getElementById('nav_container'));

}, false)