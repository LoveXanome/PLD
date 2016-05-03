import {Location} from './location';

export class Arret {
  id: number;
  is_stop: Boolean;
  name: String;
  location: Location;
  passagesSemaine : Number;
  passagesWE : Number;
  vitesse : Number;
}