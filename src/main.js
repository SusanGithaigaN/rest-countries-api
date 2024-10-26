import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

const lightIcon = document.querySelector(".light-icon");
const darkIcon = document.querySelector(".dark-icon");

// user and system theme
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

// icon toggling
const toggleIcons = () => {
    darkIcon.classList.toggle("display-none");
    lightIcon.classList.toggle("display-none");
}

// set initial theme when a page loads
const setTheme = () => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
        document.documentElement.classList.add("dark");
        darkIcon.classList.add("display-none");
        return;
    }
    lightIcon.classList.add("display-none");
}

// manual switch between themes
const switchTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        toggleIcons();
        return;
    }
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    toggleIcons();
};

// switch themes when icon is clicked
lightIcon.addEventListener("click", switchTheme);
darkIcon.addEventListener("click", switchTheme);

// invoke theme check when page initially loads
setTheme(); 