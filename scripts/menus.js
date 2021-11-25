const header = document.querySelector('.header')

document.onload = headerShrink()

document.addEventListener('scroll', headerShrink)

function headerShrink () {
    if (window.scrollY == 0) {
        header.classList.remove('header-shrink')
    } else {
        header.classList.add('header-shrink')
    }
}
