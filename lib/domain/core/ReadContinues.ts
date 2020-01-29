import { watch as Chokidar } from 'chokidar';
import { debug } from 'debug';
import { Subject } from 'rxjs';
import { Readable } from '../Readable';
import { FileEvent } from '../Trackable';

const logger = debug('grafter:domain:ReadContinues');
const tracer = debug('grafter:trace:domain:ReadContinues');
export class ReadContinues extends Readable {
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

			const handle = (subject: Subject<FileEvent>) => {
				return (filepath: string) => {
					subject.next({ filepath });
				};
			};

			watcher.on('add', reset(log('adding', handle(this.Added$))));
			watcher.on('change', reset(log('changing', handle(this.Changed$))));
			watcher.on('unlink', reset(log('removing', handle(this.Removed$))));

			watcher.on('error', reset<Error>(err => {
				logger('error while processing - error %s', err);
				fatal(err);
			}));
		});
	}
}
