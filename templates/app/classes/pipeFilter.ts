import {Pipe} from "angular2/core";

@Pipe({
	name: "filterName"
})
export class PipeFilter{
	transform(value, args?) {
	   	// ES6 array destructuring
	   	let [nameFilter] = args;
	  	return value.filter(
	  		(item) => item.name.toLowerCase().startsWith(nameFilter.toLowerCase())
	  	);
	}
}