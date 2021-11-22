// request GET arguments from URL

var request = {};
var pairs = location.search.substring(1).split('&');
for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    request[pair[0]] = pair[1];
}

function delPrecMsg () {
    const precMsg = document.querySelector('.msg')
    if (precMsg) {
        precMsg.remove()
    }
}

function displayMessage (msgType, livre = null) {
    delPrecMsg()
    const divider = document.querySelector('.main-divider')
    let msg = document.createElement('div')
    let msgCloser = document.createElement('i')
    let msgText = document.createElement('p')
    msg.classList.add('msg')
    msgCloser.classList.add('fas', 'fa-times')
    if (msgType == 'error') {
        msg.id = 'error'
        msgText.innerHTML = 'Identifiant de recherche invalide'
    } else if (msgType == 'addSuccess') {
        msg.id = 'add-success'
        msgText.innerHTML = `Livre ajouté avec succès. <a href="#${livre[0]}">Cliquez ici</a> pour vous y rendre`
    }
    msg.append(msgCloser, msgText)
    msgCloser.addEventListener('click', delPrecMsg)
    divider.insertAdjacentElement('afterend', msg)
}

// scroll to searched book

const main = document.querySelector('main .container')

window.addEventListener('load', () => {
    if (request['livre']) {
        try {
            const livre = document.getElementById(request['livre'])
            livre.scrollIntoView({behavior : 'smooth', block: "center", inline: "nearest"});
        } catch {
            displayMessage('error')
        }
    }
})

// managing books functions

function addLivre(livre) {
    let section = document.createElement('section')
    section.classList.add("livre")
    section.id = livre[0]
    section.innerHTML = `<div class="img-container"><img src="${livre[1].imgSrc}" alt="Première de couverture de : ${livre[1].title}"></div>
                        <div class="livre-description">
                            <div class="livre-title-group">
                                <h2 class="livre-titre">${livre[1].title} de ${livre[1].author}</h2>
                                <em>Identifiant de recherche : <span class="livre-search-id">${livre[0]}</span></em>
                            </div>
                            <p class="livre-resume">${livre[1].summary}</p>
                        </div>
                        <button class="btn suppr" onclick="delBook(this)">SUPPRIMER</button>`
    main.append(section)
}

function delBook(el) {
    delPrecMsg()
    let section = el.parentElement
    if (section.previousElementSibling && section.previousElementSibling.classList.contains('main-divider')) {
        section.previousElementSibling.remove()
    } else if (section.nextElementSibling && section.nextElementSibling.classList.contains('main-divider')) {
        section.nextElementSibling.remove()
    }
    section.remove()
}

function addDivider() {
    let divider = document.createElement('div')
    divider.classList.add('main-divider')
    main.append(divider)

}

// adding books to DOM from JSON file

const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function() {
  const livres = JSON.parse(this.responseText);
  livresList = Object.entries(livres)
  let i = 1;
  for (livre of livresList) {
    addDivider()
    addLivre(livre)
    i++
  }
}
xmlhttp.open("GET", "scripts/livreslist.json", true);
xmlhttp.send();

// store image when selected in the form

const input = document.querySelector('input[name="new-book-cover"]')
var newCoverPath;

function storePath() {
    let file = input.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        newCoverPath = reader.result;
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
}


const newBookField = document.querySelector('.ajout-background')
function closeBookField (target) {
    newBookField.classList.remove('show')
}
function openBookField () {
    newBookField.classList.add('show')
    let title = newBookForm.querySelector('input[name="new-book-title"]').focus()
}

// new book field listeners

const newBookForm = document.forms['new-book']
const fieldOpener = document.querySelector("#open-new-book")
const fieldCloser = document.querySelector(".ajout i")
newBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let bookId = newBookForm.elements['new-book-title'].value.toLowerCase().replaceAll(' ', '_')
    livre = [bookId, {
                title : newBookForm.elements['new-book-title'].value,
                author : newBookForm.elements['new-book-author'].value,
                summary :  newBookForm.elements['new-book-summary'].value,
                imgSrc : newCoverPath
        }
    ]
    if (!livre[1].imgSrc) {
        livre[1].imgSrc = "img/covers/no_cover.png"
    }
    addDivider()
    addLivre(livre)
    displayMessage('addSuccess', livre)
    newBookForm.reset()
    closeBookField()
})

fieldOpener.addEventListener("click", openBookField)
fieldCloser.addEventListener("click", closeBookField)
window.addEventListener('mousedown',  (e) => {
    if (e.target == newBookField) {
        closeBookField()
    }
})