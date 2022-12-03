import '../css/style.css';
import AboutList from './aboutList';
import ArtListing from './artListing';
import ExternalServices from './externalServices';

import { loadHeaderFooter } from './utils';

loadHeaderFooter();

const dataSource = new ExternalServices();

const myArt = new ArtListing(dataSource);

const myAbout = new AboutList(dataSource);

myArt.init()
myAbout.init()

// document.querySelector('#img')
// .addEventListener('click', (e) => {
//   e.preventDefault();
//     dataSource.checkout();
// });