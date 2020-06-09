'use strict'
const PdfBuilder = (function () {


    let pdf_estructure = {
        type: 'iframe',
        id: 'pdg_generateur',
        src: 'https://drive.google.com/file/d/1L3MwT0gwelbjV2k9dRIXAefbJ1nsFqX8/view?usp=sharing',
        src_drive: "https://docs.google.com/viewer?srcid=1L3MwT0gwelbjV2k9dRIXAefbJ1nsFqX8&pid=explorer&efh=false&a=v&chrome=false&embedded=true"
    }

    function createElement(tagName, attributes) {
        const element = document.createElement(tagName)

        for (let i = 0; i < attributes.length; i++) {
            element.setAttribute(attributes[i].name, attributes[i].value)
        }

        return element
    }

    function pdfBuilder(container) {

        container.appendChild(createElement(pdf_estructure.type, [{ name: 'src', value: pdf_estructure.src_drive }, { name: 'id', value: pdf_estructure.id }]))
        return container
    }




    return {
        init: function (container) {
            console.log('pdf !', container)
            pdfBuilder(container)
        }
    }
})()

window.addEventListener('DOMContentLoaded', function loaded(event) {
    window.removeEventListener('DOMContentLoaded', loaded, false)

    // instance d'object Module memoire
    PdfBuilder.init(document.getElementById('pdf_build'));

}, false)