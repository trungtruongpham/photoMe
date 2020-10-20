import { Photo } from './Photo';
import { Review } from './Review';

export interface Album {
    albumType: string;
    title: string;
    thumbnailId: string;
    photos?: Photo[];
    review?: Review[];
}
