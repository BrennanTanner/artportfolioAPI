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
   const path = getLocationFromUrl();
   const pathId = getIdFromUrl();

   const _id = sessionStorage.getItem('_id');
   if (!_id) {
      if (path == 'login') {
      } else if ((path != 'about' && path != 'gallery') || path == 'newPiece') {
         window.location.replace('../login/index.html');
      } else {
         if (!pathId) {
            window.location.replace('../login/index.html');
         } else {
            sessionStorage.setItem('_id', pathId);
         }
      }
   } else {
      if (
         path == 'about' ||
         path == 'gallery' ||
         path == 'newPiece' ||
         path == 'login'
      ) {
      } else {
         //window.location.replace('?' + _id);
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

export function getLocationFromUrl() {
   var URLArray = window.location.pathname.split('?');
   var pathArray = URLArray[0].split('/');

   var lastItem = pathArray.length - 1;

   if (pathArray[lastItem] == 'index.html') {
      return pathArray[lastItem - 1];
   } else {
      return pathArray[lastItem];
   }
}

export function getIdFromUrl() {
   var URLArray = window.location.pathname.split('?');

   return URLArray[1];
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

   const menu = document.querySelector('.menu');
   const menuItems = document.querySelectorAll('.menuItem');
   const hamburger = document.querySelector('.hamburger');
   const closeIcon = document.querySelector('.closeIcon');
   const menuIcon = document.querySelector('.menuIcon');

   function toggleMenu() {
      if (menu.classList.contains('showMenu')) {
         menu.classList.remove('showMenu');
         closeIcon.style.display = 'none';
         menuIcon.style.display = 'block';
      } else {
         menu.classList.add('showMenu');
         closeIcon.style.display = 'block';
         menuIcon.style.display = 'none';
      }
   }

   hamburger.addEventListener('click', toggleMenu);

   menuItems.forEach(function (menuItem) {
      menuItem.addEventListener('click', toggleMenu);
   });
}

export async function loadNavTitle(dataSource) {
   const list = await dataSource.getOwnersData();

   const headerTemplate = document.querySelector('.divider');

   const createHeaderTitle = document.createElement('h1');

   createHeaderTitle.className = 'nav-title';

   headerTemplate.appendChild(createHeaderTitle);

   if (!list.firstN) {
      createHeaderTitle.textContent = 'ART PORTFOLIO';
   } else {
      createHeaderTitle.textContent =
         list.firstN.toUpperCase() + ' ' + list.lastN.toUpperCase();
   }
}
