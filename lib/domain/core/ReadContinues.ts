import { watch as Chokidar } from 'chokidar';
import { Subject } from 'rxjs';
import { Readable } from '../Readable';

export class ReadContinues extends Readable {
	public async ProcessFilesAsync(): Promise<void> {
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
					this.tracer('%s file %s', key, filepath);
					predicate(filepath);
				};
			};

			const handle = (subject: Subject<string>) => {
				return (filepath: string) => {
					subject.next(filepath);
				};
			};

			this.logger('watching files');
			watcher.on('add', reset(log('adding', handle(this.Added$))));
			watcher.on('change', reset(log('changing', handle(this.Changed$))));
			watcher.on('unlink', reset(log('removing', handle(this.Removed$))));

			watcher.on('error', reset<Error>(err => {
				this.logger('error while processing - error %s', err);
				fatal(err);
			}));
		});
	}
}
