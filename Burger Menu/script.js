document.addEventListener("DOMContentLoaded", function() {
    const burgerMenu = document.getElementById("burger-menu");
    const menu = document.getElementById("menu");

    function toggleMenu() {
        burgerMenu.classList.toggle("open");
        menu.classList.toggle("show");
    }

    burgerMenu.addEventListener("click", toggleMenu);
});
