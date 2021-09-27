'use strict'

const NavBar = (function() {

    const LIENS = [

        {
            label: 'Accueil',
            lien: 'index.html',
            img: 'navegador.png'
        },
        {
            label: 'Projets',
            lien: 'projets.html',
            img: 'lista.png'
        },
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

    function iconPage() {
        let div = createElement('div', []);
        let img = createElement('img', [{ name: 'src', value: 'img/icone/' + 'fox.png' }]);
        let label = createElement('label', []);
        label.innerHTML = 'Cesar Trevino';

        div.setAttribute('class', 'iconPage');
        div.appendChild(img);
        div.appendChild(label);

        return div;

    }

    function creationNavbar(container) {


        LIENS.map((item) => {
            let a = createElement('a', [{ name: 'href', value: item.lien }])
            let img = createElement('img', [{ name: 'src', value: 'img/icone/' + item.img }])
            let label = createElement('label', [])
            label.innerHTML = item.label
            a.appendChild(img)
            let text = document.createTextNode(item.label)
            a.appendChild(text)
            container.appendChild(a)
        })

        return container
    }

    return {
        init: function(container) {
            let navbar_items = container;
            const URL = window.location;
            let URL_courrante = window.location.href;
            navbar_items = creationNavbar(container);

            for (let i = 0; i < navbar_items.children.length; i++) {

                if (navbar_items.children[i].href === URL_courrante) {
                    navbar_items.children[i].setAttribute('class', 'select');

                }
                if (window.location.pathname === '/') {

                    navbar_items.children[0].setAttribute('class', 'select')

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