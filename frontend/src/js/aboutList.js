export default class AboutList {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async init() {
        const id  = localStorage.getItem('author');
        const list = await this.dataSource.getOwnersData(id);
        
    }
}