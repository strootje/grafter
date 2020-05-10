import { gray } from 'chalk';

export function format(formatter: string, ...args: unknown[]): string {
	return args.map(p => gray(p)).reduce((prev, cur) => prev.replace('%s', cur), formatter);
}
