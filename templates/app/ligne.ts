import {Arret} from './arret';

export class Ligne {
    id: number;
    nom: string;
    categorie : Boolean;
    arrets: Arret[];
    couleur: String;

}

function randomColor(){
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var _i = 0; _i < 6; _i++ ) 
    {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;    
}