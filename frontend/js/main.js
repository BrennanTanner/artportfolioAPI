import '../css/style.css';
import AboutList from './aboutList';
import ArtListing from './artListing';
import GalleryPieces from './galleryPieces'
import ExternalServices from './externalServices';
import { loadHeaderFooter, checkURL } from './utils';

checkURL();
loadHeaderFooter();

const dataSource = new ExternalServices();

const myArt = new ArtListing(dataSource);

const myAbout = new AboutList(dataSource);

const myGallery = new GalleryPieces(dataSource);

myArt.init()
myAbout.init()
myGallery.init()

// document.querySelector('#img')
// .addEventListener('click', (e) => {
//   e.preventDefault();
//     dataSource.checkout();
// });