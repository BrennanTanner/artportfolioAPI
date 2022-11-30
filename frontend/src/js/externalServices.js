const baseURL = 'https://artportfolio.onrender.com/'

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw {name: 'serviceError', message: res.json()};
  }
}

export default class ExternalServices  {
  constructor() {

  }

  async getData() {
    return await fetch(baseURL + `api/getAll`)
    .then(convertToJson).then((data) => data); 
  }

  async getOwnersData(id) {
    return await fetch(baseURL + `api/get/${id}`).then(convertToJson)
    .then((data) => data);
  }
  
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