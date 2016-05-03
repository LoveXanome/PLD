import {Pipe} from "angular2/core";

@Pipe({
	name: "filterArretName"
})
export class PipeFilterArret{
	transform(value, args?) {
	   	// ES6 array destructuring
	   	let [nameFilter] = args;
        if (nameFilter == "") {
            return value;
        }
	  	return value.filter(
			(item) => item.name.toLowerCase().includes(nameFilter.toLowerCase())
	  	);
	}
}