import {Location} from './location';
import {Ligne} from './ligne';

export class Arret {
    id: number;
    is_stop: boolean;
    name: string;
    location: Location;
    vitesse : number;
    routes : Ligne[];
    vitesse_Arret_ligne : number;
    passageW_Arret_ligne : number;
    passageWE_Arret_ligne : number;
    population_200m : number;
}