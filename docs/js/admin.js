export function checkStatus() {
   const status = sessionStorage.getItem('loggedIn');

   if (status == 'true') {
      return true;
   } else {
      return false;
   }
}

export function logout() {
   const _id = sessionStorage.getItem('_id');
   sessionStorage.removeItem('loggedIn');
   sessionStorage.removeItem('_id');
   window.location.replace('/' + _id);
}

var el = document.getElementById('loginSubmit');
if (document.getElementById('loginSubmit')) {
   el.addEventListener('click', async function (e) {
      e.preventDefault();

      document.querySelector('.lds-roller').setAttribute("style", "z-index: 1;");
      document.querySelector('#loginSubmit').setAttribute("style", "display: none;");

      let headersList = {
         Accept: '*/*',
      };

      let bodyContent = new FormData();
      bodyContent.append('username', document.getElementById('username').value);
      bodyContent.append('password', document.getElementById('password').value);

      let response = await fetch(
         'https://artportfolio.onrender.com/api/login/',
         {
            method: 'POST',
            body: bodyContent,
            headers: headersList,
         }
      );

      let data = await response.json();
      if (data.success == true) {
         console.log(data._id);
         sessionStorage.setItem('loggedIn', true);
         sessionStorage.setItem('_id', data._id);
         window.location.replace('/' + data._id);
      }
   });
}
