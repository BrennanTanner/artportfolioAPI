var el = document.getElementById('userSubmit');
if (document.getElementById('userSubmit')) {
   el.addEventListener('click', async function (e) {
      e.preventDefault();

      document.querySelector('.lds-roller').setAttribute("style", "z-index: 1;");
      document.querySelector('#userSubmit').setAttribute("style", "display: none;");

      let headersList = {
         Accept: '*/*',
      };

      let bodyContent = new FormData();

      //login info
      bodyContent.append('username', document.getElementById('username').value);
      bodyContent.append('password', document.getElementById('password').value);
      //personal info
      bodyContent.append('firstN', document.getElementById('firstN').value);
      bodyContent.append('lastN', document.getElementById('lastN').value);
      bodyContent.append('email', document.getElementById('email').value);
      bodyContent.append('phoneNumber', document.getElementById('phoneNumber').value);
      //about me
      bodyContent.append('aboutMe', document.getElementById('aboutMe').value);
      //profile pic
      bodyContent.append(
         'image',
         document.getElementById('profilePicture').files[0]
      );

      //http://localhost:3030/
      let response = await fetch('https://artportfolio.onrender.com/api/newartist', {
         method: 'POST',
         body: bodyContent,
         headers: headersList,
      });

      let data = await response.json();
      console.log(data.success);
      if (data.success == false) {
         document.getElementById("matchingUser").setAttribute("style", "display: inline; color: red; font-size: smaller;")
      }
      
      else{
         sessionStorage.setItem('loggedIn', true);
         sessionStorage.setItem('_id', data._id);
         window.location.replace('index.html' + '?' + data._id);
      }
   });
}
