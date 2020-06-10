const menuBtn = document.querySelector('.menu-btn');
const menuSmall = document.querySelector('.menu-box');
let menuOpen = false;
menuBtn.addEventListener('click',() => {
    if(!menuOpen){
        menuBtn.classList.add('open');
        menuSmall.classList.add('open-box');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        menuSmall.classList.remove('open-box');
        menuOpen = false;
    }
});