import { watch as Chokidar } from 'chokidar';
import { debug } from 'debug';
import { Subject } from 'rxjs';
import { FileFactory } from '../factories/FileFactory';
import { Sourceable } from './Sourceable';
import { Watchable } from './Watchable';
import { WriteableBuilder } from './Writeable';

const logger = debug('graft:domain:SourceWatcher');
export class SourceWatcher extends Sourceable {
	public async ProcessFilesAsyncInternal(builder: WriteableBuilder): Promise<void> {
		return new Promise((done, fatal) => {
			const watcher = Chokidar('**/*', {
				cwd: this.pack.Folder
			});

			const timeout = 1000 * 60 * 60;
			const subjectAdded = new Subject<Watchable>();
			const subjectChanged = new Subject<Watchable>();
			const subjectRemoved = new Subject<Watchable>();
			const subscriptionAdded = subjectAdded.subscribe(this.CreateAsyncFileEventAddedEventHandler(builder));
			const subscriptionChanged = subjectChanged.subscribe(this.CreateAsyncFileEventChangedEventHandler(builder));
			const subscriptionRemoved = subjectRemoved.subscribe(this.CreateAsyncFileEventRemovedEventHandler(builder));

			const shutdown = async () => {
				await watcher.close();
				subjectAdded.complete();
				subjectChanged.complete();
				subjectRemoved.complete();
				subscriptionAdded.unsubscribe();
				subscriptionChanged.unsubscribe();
				subscriptionRemoved.unsubscribe();
				done();
			};

			const timer = setTimeout(shutdown, timeout);
			const reset = <T = string>(predicate: (filepath: T) => void) => {
				timer.refresh();
				return predicate;
			};

			const log = (key: string, predicate: (filepath: string) => void) => {
				return (filepath: string) => {
					logger('%s file %s', key, filepath);
					predicate(filepath);
					logger('%s file %s - done', key, filepath);
				};
			};

			const handle = (subject: Subject<Watchable>) => {
				return (filepath: string) => {
					const file = FileFactory.Create(filepath);
					subject.next(file);
				};
			};

			watcher.on('add', reset(log('adding', handle(subjectAdded))));
			watcher.on('change', reset(log('changing', handle(subjectChanged))));
			watcher.on('unlink', reset(log('removing', handle(subjectRemoved))));

			watcher.on('error', reset<Error>(err => {
				logger('error while processing - error %s', err);
				fatal(err);
			}));
		});
	}
}
