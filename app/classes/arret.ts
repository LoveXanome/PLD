import {Location} from './location';
import {Ligne} from './ligne';

export class Arret {
    id: number;
    is_stop: Boolean;
    name: String;
    location: Location;
    vitesse : Number;
    routes : Ligne[];
    vitesse_Arret_ligne : Number;
    passageW_Arret_ligne : Number;
    passageWE_Arret_ligne : Number;
	population_200m: Number;
}