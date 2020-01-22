import { Sourceable } from './Sourceable';
import { stream as FastGlob } from 'fast-glob';
import { Subject } from 'rxjs';

export class SourceReader extends Sourceable {
	public async HandleFilesAsync(): Promise<void> {
		const files = FastGlob('**/*', {
			cwd: this.pack.Folder
		});

		const subject = new Subject<string>();
		const sub = subject.subscribe(console.log);

		for await (const filepath of files) {
			const filepathAsString = filepath as string;
			subject.next(filepathAsString);
		}

		subject.complete();
		sub.unsubscribe();
	}
}
