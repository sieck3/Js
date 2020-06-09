'use strict'
const NavBar = (function () {

    const LIENS = [
        {
            label: 'Accueil',
            lien: 'index.html'
        },
        {
            label: 'Projets',
            lien: 'projets.html'
        }
        ,
        {
            label: 'Contact',
            lien: 'contact.html'
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
            a.innerHTML = LIENS[i].label
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
            for (let i = 0; i < x.children.length; i++) {

                if (x.children[i].href.slice(x.children[i].href.indexOf('/Js/') + 4, x.children[i].href.length) === URL_courrante) {
                    console.log('Response: ', x.children[i].href.slice(x.children[i].href.indexOf('/Js/') + 4, x.children[i].href.length))
                    x.children[i].setAttribute('class', 'select')
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