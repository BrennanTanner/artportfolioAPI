import { checkStatus, logout } from './admin';

function convertToText(res) {
   console.log(res);
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

export function checkURL(){
  const path = getIdFromUrl();
  const _id = sessionStorage.getItem('_id');
 console.log("path: "+path );
if( path == "index.html" ){
   window.location.replace("/"+_id);
};

}

export function getIdFromUrl() {
  var pathArray = window.location.pathname.split('/');

  if(pathArray[1] == "about"||pathArray[1] == "gallery"){
    return pathArray[2];
  }
else {
  return pathArray[1];
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

   if(loggedIn){ 
    document.getElementById('userControls').style.display = "inline";
   document.getElementById('loginButton').style.display = "none";

   document.getElementById('logoutButton').style.display = "inline";
   document.getElementById('logoutButton').addEventListener("click", function() { logout()});
  }

}
