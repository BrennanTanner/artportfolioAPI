export default class ArtListing {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }

    async init() {
        const list = await this.dataSource.getData();
        const authorId = list[0]._id

        this.setLocalStorageId(authorId);

        const authorData = await this.dataSource.getOwnersData(authorId);
        const template = document.querySelector('.art-collection')
        console.log(authorData)

        authorData.pieces.forEach((element) => {
            console.log(element)
            template.append(this.artPieceTemplate(element))
        })
        
    }

    artPieceTemplate(element) {
        let artSection = document.createElement('div');
        let artTitle = document.createElement('h1');
        let artMedium = document.createElement('p');
        let artSummaryTitle = document.createElement('h3')
        let artSummary = document.createElement('p');
        let imageArea = document.createElement('div');

        artSection.className = "art-items";
        artTitle.textContent = element.title;
        artSummaryTitle.textContent = "Summary"
        artMedium.textContent = `Medium: ${element.medium}`;
        artSummary.textContent = element.aboutBody;
        imageArea.className = "image-content"

        element.drafts.forEach((element) => {
            let artImage = document.createElement('img');
            artImage.src = element.img
            artImage.className = "gallery-image"
            imageArea.appendChild(artImage)
        })
        artSection.appendChild(artTitle)
        artSection.appendChild(imageArea)
        artSection.appendChild(artMedium)
        artSection.appendChild(artSummaryTitle)
        artSection.appendChild(artSummary)

        return artSection;
    }


    setLocalStorageId(id) {
        localStorage.setItem('author', id)
    }
}