export async function checkStatus() {
   const _id = sessionStorage.getItem('_id');
   const response = await fetch(
      'https://artportfolio.onrender.com/api/status/' + _id
   );

   const data = await response.json();
   const localLog = sessionStorage.getItem('loggedIn');

   if (data.isLoggedIn == true && localLog == 'true') {
      return true;
   } else {
      return false;
   }
}

export async function logout() {
   const _id = sessionStorage.getItem('_id');

   let headersList = {
      Accept: '*/*',
   };

   const response = await fetch(
      'https://artportfolio.onrender.com/api/logout/' + _id,
      {
         method: 'PATCH',
         headers: headersList,
      }
   );

   const data = await response.json();

   const status = data.isLoggedIn;
   if (status == 'true') {
      return true;
   } else {
      sessionStorage.setItem('loggedIn', false);
      window.location.replace('../index.html' + '?' + _id);
      return false;
   }
}

var el = document.getElementById('loginSubmit');
if (document.getElementById('loginSubmit')) {
   el.addEventListener('click', async function (e) {
      e.preventDefault();

      document
         .querySelector('.lds-roller')
         .setAttribute('style', 'z-index: 1;');
      document
         .querySelector('#loginSubmit')
         .setAttribute('style', 'display: none;');

      let headersList = {
         Accept: '*/*',
      };

      let bodyContent = new FormData();
      bodyContent.append('username', document.getElementById('username').value);
      bodyContent.append('password', document.getElementById('password').value);

      let response = await fetch(
         'https://artportfolio.onrender.com/api/login/',
         {
            method: 'PATCH',
            body: bodyContent,
            headers: headersList,
         }
      );

      let data = await response.json();
      if (data.success == true) {
         sessionStorage.setItem('loggedIn', true);
         sessionStorage.setItem('_id', data._id);
         window.location.replace('../index.html' + '?' + data._id);
      }
   });
}
