const baseURL = 'https://artportfolio.onrender.com/';

async function convertToJson(res) {
   if (res.ok) {
      return res.json();
   } else {
      throw { name: 'serviceError', message: res.json() };
   }
}

export default class ExternalServices {
   constructor() {}

   async getOwnersData() {
      const id = sessionStorage.getItem('_id');

      return await fetch(baseURL + `api/get/${id}`)
         .then(convertToJson)
         .then((data) => data);
   }
}
