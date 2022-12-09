export default class ArtListing {
   constructor(dataSource) {
      this.dataSource = dataSource;
   }

   async init() {
      const list = await this.dataSource.getOwnersData();

      const authorId = sessionStorage.getItem('_id');

      const template = document.querySelector('.art-collection');

      const headerTemplate = document.querySelector('.divider');

      const createHeaderTitle = document.createElement('h1');
      createHeaderTitle.textContent = list.firstN + ' ' + list.lastN;
      createHeaderTitle.className = 'nav-title';

      if (this.dataSource.pieces) {
         headerTemplate.appendChild(createHeaderTitle);
      }
      else{
       
        template.innerHTML=`
        <h2>Looks like there's nothing here!</h2>
        <p>Try clicking the "+" to add a piece and start your portfolio</p>`;
      }

      //createUsersTitle(list);

      list.pieces.forEach((element) => {
         template.append(this.artPieceTemplate(element));
      });
   }

   artPieceTemplate(element) {
      const scale = 'w_250,h_300,c_fill';

      var UrlArray = element.img.split('/');
      UrlArray.splice(6, 0, scale);
      const scaledUrl = UrlArray.join('/');
      console.log('img path ' + scaledUrl);
      let artSection = document.createElement('div');
      let artImg = document.createElement('img');
      artSection.className = 'art-items';
      artImg.setAttribute('src', scaledUrl);
      artImg.setAttribute('class', 'favoriteImg');
      artSection.appendChild(artImg);

      return artSection;
   }

   setLocalStorageId(id) {
      localStorage.setItem('author', id);
   }
}
