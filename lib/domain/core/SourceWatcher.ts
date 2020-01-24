import { watch as Chokidar } from 'chokidar';
import { debug } from 'debug';
import { Subject } from 'rxjs';
import { Sourceable } from '../Sourceable';

const logger = debug('graft:domain:SourceWatcher');
const tracer = debug('graft:trace:domain:SourceWatcher');
export class SourceWatcher extends Sourceable {
	public async ProcessFilesAsyncInternal(): Promise<void> {
		return new Promise((done, fatal) => {
			const watcher = Chokidar('**/*', {
				cwd: this.pack.Folder
			});

			const timeout = 1000 * 60 * 60;
			const shutdown = async () => {
				await watcher.close();
				done();
			};

			const timer = setTimeout(shutdown, timeout);
			const reset = <T = string>(predicate: (filepath: T) => void) => {
				timer.refresh();
				return predicate;
			};

			const log = (key: string, predicate: (filepath: string) => void) => {
				return (filepath: string) => {
					tracer('%s file %s', key, filepath);
					predicate(filepath);
					tracer('%s file %s - done', key, filepath);
				};
			};

			const handle = (subject: Subject<string>) => {
				return (filepath: string) => {
					subject.next(filepath);
				};
			};

			watcher.on('add', reset(log('adding', handle(this.addedSubject))));
			watcher.on('change', reset(log('changing', handle(this.changedSubject))));
			watcher.on('unlink', reset(log('removing', handle(this.removedSubject))));

			watcher.on('error', reset<Error>(err => {
				logger('error while processing - error %s', err);
				fatal(err);
			}));
		});
	}
}
