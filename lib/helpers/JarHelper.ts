import { createReadStream } from 'fs';
import { Entry, Parse } from 'unzipper';
import { PromiseWriter } from './values/PromiseWriter';

export class JarHelper {
	public static async GetJsonAsync<T>(jarpath: string, sourcepath: string): Promise<T> {
		const content = await this.GetStringAsync(jarpath, sourcepath);

		return JSON.parse(content) as T;
	}

	public static GetStringAsync(jarpath: string, sourcepath: string): Promise<string> {
		return new Promise<string>((done, fatal) => {
			createReadStream(jarpath).pipe(Parse()).on('entry', (entry: Entry) => {
				if (entry.path != sourcepath) {
					entry.autodrain();
					return;
				}

				return entry.pipe(new PromiseWriter(done, fatal));
			});
		});
	}
}
