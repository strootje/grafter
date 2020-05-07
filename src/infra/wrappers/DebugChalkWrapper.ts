import { gray } from 'chalk';
import { debug } from 'debug';

export interface DebugChalkLogger {
	(formatter: string, ...args: unknown[]): void;
}

export function CreateLogger(namespace: string): DebugChalkLogger {
	const logger = debug(`grafter:${namespace}`)
	return (formatter, ...args): void => logger(formatter, ...args.map(p => gray(p)));
}
