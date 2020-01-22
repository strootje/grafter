export class InvalidProfileError extends Error {
	constructor(profileName: string) {
		super(`invalid profile: '${profileName}'`);
	}
}
