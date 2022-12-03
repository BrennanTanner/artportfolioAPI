const baseURL = 'https://artportfolio.onrender.com/';
const imageURL = '';

async function convertToJson(res) {
   if (res.ok) {
      return res.json();
   } else {
      throw { name: 'serviceError', message: res.json() };
   }
}

export default class ExternalServices {
   constructor() {}

   async getData() {
      return await fetch(baseURL + `api/getAll`)
         .then(convertToJson)
         .then((data) => data);
   }

   async getOwnersData(id) {
      return await fetch(baseURL + `api/get/${id}`)
         .then(convertToJson)
         .then((data) => data);
   }

  //  async checkout() {
  //     const formElement = document.forms['img'];

  //     console.log(formElement);
  //     try {
  //         // select file input
  //         const input = document.getElementById('avatar');

  //         // add event listener
  //         input.addEventListener('change', () => {
  //            uploadFile(input.files[0]);
  //            console.log("file changed" + input.files[0]);
  //         });
 
  //         const uploadFile = (file) => {
  //            // add the file to the FormData object
  //            const fd = new FormData();
  //            fd.append('avatar', file);
  //            console.log("file appended" + fd);
 
  //            // send `POST` request
  //            fetch('https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5&action=upload&source=FILES["file"]&format=json', {
  //               method: 'POST',
  //               body: file,
  //            })
  //               .then((res) => res.json())
  //               .then((json) => console.log(json))
  //               .catch((err) => console.error(err));
  //         };
  //        //.then((data) => data);
  //        console.log(res);
  //     } catch (err) {
  //        // get rid of any preexisting alerts.
  //        for (let message in err.message) {
  //        }

  //        console.log(err);
  //     }
  //  }


  
   //   async checkout(payload) {
   //     const options = {
   //       method: 'POST',
   //       headers: {
   //         'Content-Type': 'application/json',
   //       },
   //       body: JSON.stringify(payload),
   //     };
   //     return await fetch(baseURL + 'checkout/', options).then(convertToJson);
   //   }

   //   async loginRequest(user) {
   //     const options = {
   //       method: 'POST',
   //       headers: {
   //         'Content-Type': 'application/json'
   //       },
   //       body: JSON.stringify(user)
   //     }
   //     const response = await fetch(baseURL + 'login', options).then(convertToJson);
   //     return response.accessToken;
   //   }

   //   async getOrders(token) {
   //     const options = {
   //       method: 'GET',
   //       headers: {
   //         'Authorization': `Bearer ${token}`
   //       }
   //     }
   //     const response = await fetch(baseURL + 'orders', options).then(convertToJson);
   //     return response;
   //   }
}
