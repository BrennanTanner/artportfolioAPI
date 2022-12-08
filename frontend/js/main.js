import '../css/style.css';
import AboutList from './aboutList';
import ArtListing from './artListing';
import GalleryPieces from './galleryPieces'
import ExternalServices from './externalServices';
import { loadHeaderFooter, checkURL, getIdFromUrl } from './utils';

checkURL();
loadHeaderFooter();
const path = getIdFromUrl();

const dataSource = new ExternalServices();

const myArt = new ArtListing(dataSource);
const myAbout = new AboutList(dataSource);
const myGallery = new GalleryPieces(dataSource);
console.log(path);
if (path == "about"){myAbout.init()} 
else if (path == "gallery"){myGallery.init()}
else {myArt.init()}







// document.querySelector('#img')
// .addEventListener('click', (e) => {
//   e.preventDefault();
//     dataSource.checkout();
// });