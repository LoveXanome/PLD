import {Arret} from './arret';

export class Ligne {
    id: string;
    name: string;
    category : Boolean;
    short_name : string;
    points: Arret[];
    stops: Arret[];
    color: String;
    polyligne: any;
    isChecked: boolean;
    interdistance : Number;
    ratio : Number;
    average_speed : Number;
    passages: {passagesWeek : Number,
               passagesWE : Number};
    population_200m : Number;

    getted:boolean;

    constructor(){
        this.getted = false;
    }
}