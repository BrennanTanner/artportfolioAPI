import '../css/style.css';
import ArtListing from './artListing';
import ExternalServices from './externalServices';

import { loadHeaderFooter } from './uitils';

loadHeaderFooter();

const dataSource = new ExternalServices();

const myArt = new ArtListing(dataSource);

myArt.init()

