import { Writable } from 'stream';

export class PromiseWriter extends Writable {
	private readonly _resolve: (data: string) => void;
	private readonly _reject: (err: string) => void;

	public constructor(resolve: (data: string) => void, reject: (err: string) => void) {
		super();

		this._resolve = resolve;
		this._reject = reject;
	}

	public _write(chunk: any, encoding: string, callback: (error?: Error | null) => void): void {
		try {
			const buffer = Buffer.isBuffer(chunk) ? chunk : new Buffer(chunk, encoding as BufferEncoding);
			this._resolve(buffer.toString('utf8'));
			callback(null);
		} catch (err) {
			this._reject(err);
			callback(err);
		}
	}
}
