import {Ligne} from './ligne';
import {Location} from './location';

export class Ville {
  id: number;
  agency: string;
  location: Location;
  lignes: Ligne[] = [];
}