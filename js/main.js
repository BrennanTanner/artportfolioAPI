import './css/style.css';
import AboutList from '/js/aboutList';
import ArtListing from '/js/artListing.js';
import GalleryPieces from '/galleryPieces';
import ExternalServices from './externalServices.js';
import {
   loadHeaderFooter,
   checkURL,
   getIdFromUrl,
   appendFormLink
} from './utils';

checkURL();
loadHeaderFooter();
const path = getIdFromUrl();

const dataSource = new ExternalServices();

const myArt = new ArtListing(dataSource);
const myAbout = new AboutList(dataSource);
const myGallery = new GalleryPieces(dataSource);

if (path == 'about') {
   myAbout.init();
} else if (path == 'gallery') {
   myGallery.init();
} else if (path == 'newPiece') {
   appendFormLink('newpiece/');
} else if (path == 'newUser') {
   appendFormLink('newuser/');
} else {
   myArt.init();
}

