export class Photo {
    id: string;
    url: string;
    description: string;
    dateAdded: Date;
    isMain: boolean;

    constructor(){
        this.url = '';
        this.description = '';
    }
}
