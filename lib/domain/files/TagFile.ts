import { JsonFile } from './JsonFile';

export interface TagJson {
	values: string[];
}

export class TagFile extends JsonFile<TagJson> {
}
