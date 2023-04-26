import gsap from "gsap"; 

let menuIsOpen: boolean = false;

let width = document.documentElement.clientWidth;

const nav = document.querySelector(".nav-container") as HTMLDivElement;
const menuOverlay = document.querySelector(".menu-overlay") as HTMLDivElement;
const menuOptions = document.querySelectorAll(".menu-overlay a");
const showDesktopNavLinks = document.querySelector(".desktop-links") as HTMLUListElement;
const menuToggleBtn = document.querySelector(".menu-toggle-btn") as HTMLButtonElement;


export default function init() {
    console.log("hej");

    gsap.to(menuOverlay, {x: width, opacity: 0});
    
    /* Create eventlisteners */
    window.addEventListener("resize", updateScreenSize);
    window.addEventListener("scroll", changeNavColor);
    window.addEventListener("resize", removeClass);

    menuToggleBtn?.addEventListener("click", toggleMenu);
    menuToggleBtn?.addEventListener("keypress", toggleMenu);

    /* Calling functions */
    removeClass();
    checkScreenSize();
    navAnimation();

    for (let i = 0; i < menuOptions.length; i++) // Closes menu after a link press
        menuOptions[i].addEventListener("click", () => {
            closeMenu();
        });
}

function updateScreenSize() {
    width = document.documentElement.clientWidth;
}

function changeNavColor() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        nav.classList.add("nav-scroll-BG");
    }

    else {
        nav.classList.remove("nav-scroll-BG");
        nav.classList.add("nav-scroll-bg-remove");
    }
}

function removeClass() {
    if (width > 919) {
        showDesktopNavLinks.classList.remove("hidden");
        menuToggleBtn.classList.add("hidden");
        console.log(menuToggleBtn);
    } else {
        showDesktopNavLinks.classList.add("hidden");
        menuToggleBtn.classList.remove("hidden");
    }
}

function checkScreenSize() {
    if (width > 910) {
        nav.classList.remove("dark-background");
        showDesktopNavLinks.classList.remove("hidden");
    }
}

function navAnimation() {
    gsap.from(nav, 
        {
            y: -200, 
            duration: 1, 
        });
}

function toggleMenu() {
    console.log("hej");

    if (!menuIsOpen) { // Mobile menu button handler
        menuOverlay.classList.remove("hide-menu-overlay");
        //updateScreenSize();
        openMenu();
        gsap.to(menuOverlay, {x: 0, duration: 1, opacity: 1});
    } else {
        menuOverlay.classList.remove("hide-menu-overlay");
        //updateScreenSize();
        closeMenu();
        gsap.to(menuOverlay, {x: width, duration: 1, opacity: 0});
    }
}

function closeMenu() {
    gsap.to(".second-row>span:nth-child(1)", {x:0, y:0, duration: 0.15});
    gsap.to(".third-row>span:nth-child(2)", {x:0, y:0, duration: 0.15, delay: 0.1});
    gsap.to(".second-row>span:nth-child(3)", {x:0, y:0, duration: 0.15, delay: 0.2});
    gsap.to(".first-row>span:nth-child(2)", {x:0, y:0, duration: 0.15, delay: 0.3});
    menuIsOpen = false;
}
function openMenu() {
    gsap.to(".first-row>span:nth-child(2)", {x:8.6, y:8.6, duration: 0.15});
    gsap.to(".second-row>span:nth-child(3)", {x:-8.6, y:8.6, duration: 0.15, delay: 0.1});
    gsap.to(".third-row>span:nth-child(2)", {x:-8.6, y:-8.6, duration: 0.15, delay: 0.2});
    gsap.to(".second-row>span:nth-child(1)", {x:8.6, y:-8.6, duration: 0.15, delay: 0.3});
    menuIsOpen = true;
}