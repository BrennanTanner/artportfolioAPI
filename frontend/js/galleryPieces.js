export default class ArtListing {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }

    async init() {
        const list = await this.dataSource.getOwnersData();
        const authorId =  sessionStorage.getItem('_id');

        const template = document.querySelector('.art-collection')

        document.getElementById("loading").setAttribute("style", "display:none;"); 
        
        list.pieces.forEach((element) => {
            console.log(element)
            template.append(this.artPieceTemplate(element))
        })
        
    }

    artPieceTemplate(element) {
        let artSection = document.createElement('div');
        let artTitle = document.createElement('h1');
        let artMainImg = document.createElement('img');
        let artMedium = document.createElement('p');
        let artSummary = document.createElement('p');
        let imageArea = document.createElement('div');

        artSection.className = "art-items";
        artMainImg.setAttribute("src", element.img);
        artTitle.textContent = element.title;
        artMedium.textContent = element.medium;
        artSummary.textContent = element.aboutBody;
        imageArea.className = "gallery-image-content"

        element.drafts.forEach((element) => {
            let artImage = document.createElement('img');
            artImage.src = element.img
            artImage.className = "gallery-image"
            imageArea.appendChild(artImage)
        })
        artSection.appendChild(artTitle);
        artSection.appendChild(artMainImg);
        artSection.appendChild(imageArea);
        artSection.appendChild(artMedium);
        artSection.appendChild(artSummary);

        return artSection;
    }

}