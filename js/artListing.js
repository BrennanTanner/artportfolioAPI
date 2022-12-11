import { checkStatus } from "./admin.js";

export default class ArtListing {
   constructor(dataSource) {
      this.dataSource = dataSource;
   }

   async init() {
      const list = await this.dataSource.getOwnersData();

      const template = document.querySelector('.art-collection');

      let status = checkStatus();

      document.getElementById('loading').setAttribute('style', 'display:none;');

      if (list.pieces) {
         list.pieces.forEach((element) => {
            template.append(this.artPieceTemplate(element));
         });
      } else if (status == 'true') {
         template.innerHTML = `
        <h2>Looks like there's nothing here!</h2>
        <p>Try clicking the "+" to add a piece and start your portfolio</p>`;
      } else {
         createHeaderTitle.textContent = 'Art Portfolio';
         template.innerHTML = `
        <h2>Looks like there's nothing here!</h2>
        <p>This artist hasn't uploaded a piece yet. Try checking later.</p>`;
      }

      //createUsersTitle(list);
   }

   artPieceTemplate(element) {
      const scale = 'w_250,h_300,c_fill';

      var UrlArray = element.img.split('/');
      UrlArray.splice(6, 0, scale);
      const scaledUrl = UrlArray.join('/');
      let artSection = document.createElement('div');
      let artImg = document.createElement('img');
      artSection.className = 'art-items';
      artImg.setAttribute('src', scaledUrl);
      artImg.setAttribute('class', 'favoriteImg');
      artSection.appendChild(artImg);

      return artSection;
   }

   //    setLocalStorageId(id) {
   //       localStorage.setItem('author', id);
   //    }
}
