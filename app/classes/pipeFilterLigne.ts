import {Pipe} from "angular2/core";

@Pipe({
	name: "filterLigneName"
})
export class PipeFilterLigne{
	transform(value, args?) {
	   	// ES6 array destructuring
	   	let [nameFilter] = args;
        if (nameFilter == "") {
            return value;
        }
	  	return value.filter(
			(item) => ("bus " + item.short_name.toLowerCase()).includes(nameFilter.toLowerCase())
	  	);
	}
}