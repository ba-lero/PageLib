const header = document.querySelector('.header');

document.onload = headerShrink();

document.addEventListener('scroll', headerShrink);

function headerShrink () {
    if (window.scrollY == 0) {
        header.classList.remove('header-shrink');
    } else {
        header.classList.add('header-shrink');
    }
}

const burger = document.querySelector('.burger i');
const burgerNav = document.querySelector('.burger-nav-background');

burger.addEventListener('click', (e) => {
    burgerNav.classList.toggle('show')
})

window.addEventListener('mousedown',  (e) => {
    if (e.target == burgerNav) {
        burgerNav.classList.remove('show')
    }
})