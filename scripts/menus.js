const header = document.querySelector('.header');

function headerShrink () {
    if (window.scrollY == 0) {
        header.classList.remove('header-shrink');
    } else {
        header.classList.add('header-shrink');
    };
};

function displayLinkBack () {
    const linkBack = document.querySelector(".link-back");
    if (window.scrollY > (window.innerHeight/2)) {
        linkBack.classList.add("display-lb");
    } else {
        if (linkBack.classList.contains) {
            linkBack.classList.remove("display-lb");
        };
    };
};

document.onload = () => {headerShrink(); displayLinkBack()};
document.addEventListener('scroll', displayLinkBack);
document.addEventListener('scroll', headerShrink);

const burger = document.querySelector('.burger i');
const burgerNav = document.querySelector('.burger-nav-background');

burger.addEventListener('click', (e) => {
    burgerNav.classList.toggle('show');
});

window.addEventListener('mousedown',  (e) => {
    if (e.target == burgerNav) {
        burgerNav.classList.remove('show');
    };
});