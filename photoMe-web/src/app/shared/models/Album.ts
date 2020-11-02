import { Photo } from './Photo';
import { Review } from './Review';

export class Album {
    id: string;
    albumType: string;
    title: string;
    thumbnailId: string;
    photos?: Photo[];
    review?: Review[];
    likesNumber: number;
}
