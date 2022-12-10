import { checkStatus, logout } from './admin.js';

function convertToText(res) {
   if (res.ok) {
      return res.text();
   } else {
      throw new Error('Bad Response');
   }
}

export async function loadTemplate(path) {
   const html = await fetch(path).then(convertToText);
   const template = document.createElement('template');
   template.innerHTML = html;
   return template;
}

export function renderWithTemplate(template, parent, data, callback) {
   let clone = template.content.cloneNode(true);
   if (callback) {
      clone = callback(clone, data);
   }
   parent.appendChild(clone);
}

export function checkURL() {
   const loggedIn = checkStatus();
   const path = getIdFromUrl();

   const _id = sessionStorage.getItem('_id');
   if (!_id) {
      if (path == 'index.html' || path == '') {
         window.location.replace('login/index.html');
      } else if (path == 'about' || path == 'gallery') {
      } else {
         console.log(path);
         sessionStorage.setItem('_id', path);
      }
   } else {
      if (path == 'index.html' || path == '') {
         window.location.replace('/' + _id);
      }
   }
}

export function appendFormLink(form) {
   const formLink = document.querySelector('.formLink');
   const api = 'https://artportfolio.onrender.com/api/';
   const id = sessionStorage.getItem('_id');
   formLink.setAttribute('method', 'POST');
   formLink.setAttribute('action', api + form + id);
}

export function getIdFromUrl() {
   var pathArray = window.location.pathname.split('/');
   let i = 1;
    if (pathArray[i]== "artportfolioAPI"){
       i=2
    }

   if (pathArray[i] == 'about' || pathArray[i] == 'gallery') {
      const id = sessionStorage.getItem('_id');
      return pathArray[i];
   } else {
      return pathArray[i];
   }
}



export async function loadHeaderFooter() {
   const loggedIn = checkStatus();

   const header = await loadTemplate('../partials/header.html');
   const footer = await loadTemplate('../partials/footer.html');
   const headerElement = document.getElementById('main-header');
   const footerElement = document.getElementById('main-footer');

   renderWithTemplate(header, headerElement);
   renderWithTemplate(footer, footerElement);

   if (loggedIn) {
      document.getElementById('userControls').style.display = 'block';
      document.getElementById('loginButton').style.display = 'none';

      document.getElementById('logoutButton').style.display = 'block';
      document
         .getElementById('logoutButton')
         .addEventListener('click', function () {
            logout();
         });
   }

   const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger= document.querySelector(".hamburger");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
   if (menu.classList.contains("showMenu")) {
     menu.classList.remove("showMenu");
     closeIcon.style.display = "none";
     menuIcon.style.display = "block";
   } else {
     menu.classList.add("showMenu");
     closeIcon.style.display = "block";
     menuIcon.style.display = "none";
   }
 }

 hamburger.addEventListener("click", toggleMenu);

menuItems.forEach( 
  function(menuItem) { 
    menuItem.addEventListener("click", toggleMenu);
  }
)
}
