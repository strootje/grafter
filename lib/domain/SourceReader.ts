// import { debug } from 'debug';
import { stream as FastGlob } from 'fast-glob';
import { Subject } from 'rxjs';
import { FileFactory } from '../factories/FileFactory';
import { Sourceable } from './Sourceable';
import { Watchable } from './Watchable';
import { WriteableBuilder } from './Writeable';

// const logger = debug('graft:domain:SourceReader');
export class SourceReader extends Sourceable {
	public async ProcessFilesAsyncInternal(builder: WriteableBuilder): Promise<void> {
		const files = FastGlob('**/*', {
			cwd: this.pack.Folder
		});

		const subject = new Subject<Watchable>();
		const sub = subject.subscribe(this.CreateAsyncFileEventAddedEventHandler(builder));

		for await (const filepath of files) {
			const filepathAsString = filepath as string;
			const file = FileFactory.Create(filepathAsString);
			subject.next(file);
		}

		subject.complete();
		sub.unsubscribe();
	}
}
