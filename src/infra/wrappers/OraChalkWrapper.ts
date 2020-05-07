import * as OraSync from 'ora';
import { Ora } from 'ora';
import { format } from './ConsoleLogWrapper';
import { DebugChalkLogger } from './DebugChalkWrapper';

export interface OraChalkEventSpinnerCallback {
	(writeLine: DebugChalkLogger): Promise<void>;
}

export async function CreateEventSpinnerAsync(callbackAsync: OraChalkEventSpinnerCallback): Promise<void> {
	let spinner: Ora = OraSync({});

	const newSpinner = () => spinner = OraSync({ text: 'waiting for next event ..' }).start();
	const writeLine: DebugChalkLogger = (formatter: string, ...args: unknown[]): void => {
		spinner.succeed(format(formatter, ...args));
		newSpinner();
	};

	try {
		newSpinner();
		await callbackAsync(writeLine);
		spinner.stop();
	} catch (err) {
		spinner.fail(err.message);
	}
}
