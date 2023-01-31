const menuBtnElement = document.querySelector('.menu-btn');
const hamburger = document.querySelector('.menu-btn-burger');
const sideDrawer = document.getElementById('side-drawer');

let showMenu = false;
function openBurgerMenu(){
    if(!showMenu){
        hamburger.classList.add('open');
        sideDrawer.classList.add('open');

        showMenu = true;

    }else{
        closeBurgerMenu();
    }
}
function closeBurgerMenu(){
    hamburger.classList.remove('open');
    sideDrawer.classList.remove('open');

    showMenu = false;
}

menuBtnElement.addEventListener('click', openBurgerMenu);