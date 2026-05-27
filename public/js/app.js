//* Cms -> Content Management System


//? modal
const toggleMenu = document.querySelector(".toggle-sidebar");
const themeBtn = document.querySelector('.theme-button')

//? flags
let isDarkMode = false;

console.log();

//! on documnet load (onpage load)
function onPageLoad() {
  const isDarkModeAvailable = JSON.parse(localStorage.getItem('isDarkMode'));
  isDarkMode = isDarkModeAvailable;
  if (isDarkModeAvailable) {
    themeHandler()
  };
}
//! theme functions
function themeClickHandler() {
  if (!isDarkMode) {
    isDarkMode = true;
    darkThemeHandler();
    saveThemeInLocalStorage()
    return;
  }
  isDarkMode = false;
  lightThemeHandler();
  saveThemeInLocalStorage();
}
function themeHandler() {
  if (!isDarkMode) {
    lightThemeHandler();
  } else {
    darkThemeHandler()
  }
}
function lightThemeHandler() {
  document.documentElement.classList.remove('dark');
  themeBtn.firstElementChild.className = 'fa-solid fa-moon'
}
function darkThemeHandler() {
  document.documentElement.classList.add('dark');
  themeBtn.firstElementChild.className = 'fa-solid fa-sun';
}


//! save Data in LocalStorage
function saveThemeInLocalStorage() {
  localStorage.setItem('isDarkMode', isDarkMode);
}



//? set Events
document.addEventListener('DOMContentLoaded', onPageLoad)
toggleMenu.addEventListener("click", function () {
  document.querySelector(".sidebar").classList.toggle("open");
});
themeBtn.addEventListener('click', themeClickHandler)
