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
        let artSummary = document.createElement('p');
        artSection.className = "art-items";
        artTitle.textContent = element.title;
        artMedium.textContent = element.medium;
        artSummary.textContent = element.aboutBody;

        element.drafts.forEach((element) => {
            console.log(element)
        })

        artSection.appendChild(artTitle)
        artSection.appendChild(artMedium)
        artSection.appendChild(artSummary)

        return artSection;
    }


    setLocalStorageId(id) {
        localStorage.setItem('author', id)
    }
}