'use strict'
const Header = (function() {

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
        // div.appendChild(label);

        return div;

    };

    function titlePage(title) {

        //H1 Title page
        let title_container = createElement('div', [{ name: 'id', value: 'title_page' }]);
        let h1 = createElement('h1', []);
        h1.innerHTML = title;
        title_container.appendChild(h1);

        return title_container;
    };



    return {
        init: function(container) {

            let titlePageValue = titlePage('sieck');
            let iconPageValue = iconPage();

            container.appendChild(iconPageValue);
            container.appendChild(titlePageValue);

        }
    }
})()

window.addEventListener('DOMContentLoaded', function loaded(event) {
    window.removeEventListener('DOMContentLoaded', loaded, false)

    // instance d'object Module memoire
    Header.init(document.getElementById('header_container'));

}, false)