import { CreditCard } from 'angular-cc-library';
import { Album } from './Album';
import { Photo } from './Photo';

export class User {
  id: string;
  username: string;
  address: string;
  email: string;
  phone: string;
  name: string;
  knownAs: string;
  age: number;
  gender: string;
  createdAt: Date;
  lastActive: Date;
  photoUrl: string;
  city: string;
  country: string;
  interests?: string;
  introduction?: string;
  lookingFor?: string;
  avatar?: Photo;
  avatarUrl: string;
  photos?: Photo[];
  albums?: Album[];
  creditCard: CreditCard;
}
