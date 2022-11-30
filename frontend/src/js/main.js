import '../css/style.css';

// import { loadHeaderFooter } from './uitils';

// loadHeaderFooter();

fetch('https://artportfolio.onrender.com/api/getAll') 
.then((response) => {
  console.log(response)  
}) .then((error) => {
    console.log(error)
});