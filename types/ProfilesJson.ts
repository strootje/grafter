type ProfilesJsonProfile_Something = 'latest-release' | 'latest-snapshot';
export type ProfilesJsonProfileVersion = ProfilesJsonProfile_Something | string;
export type ProfilesJsonProfileType = ProfilesJsonProfile_Something | 'custom';
export type ProfilesJsonProfileIcon = 'Grass' | 'Crafting_Table';

export interface ProfilesJsonLauncherVersion {
	format: number;
	name: string;
	profilesFormat: number;
}

export interface ProfilesJsonProfilesProfile {
	created: string;
	gameDir: string;
	icon: ProfilesJsonProfileIcon;
	javaArgs: string;
	lastUsed: string;
	lastVersionId: ProfilesJsonProfileVersion;
	name: string;
	type: ProfilesJsonProfileType;
}

export interface ProfilesJsonProfiles {
	[id: string]: ProfilesJsonProfilesProfile;
}

export interface ProfilesJsonSelectedUser {
	account: string;
	profile: string;
}

export interface ProfilesJsonSettings {
	channel: 'beta';
	crashAssistance: boolean;
	enableAdvanced: boolean;
	enableAnalytics: boolean;
	enableHistorical: boolean;
	enableReleases: boolean;
	enableSnapshots: boolean;
	keepLauncherOpen: boolean;
	locale: string;
	profileSorting: 'ByLastPlayed';
	showGameLog: boolean;
	showMenu: boolean;
	soundOn: boolean;
}

export interface ProfilesJson {
	authenticationDatabase: {};
	clientToken: string;
	launcherVersion: ProfilesJsonLauncherVersion;
	profiles: ProfilesJsonProfiles;
	selectedUser: ProfilesJsonSelectedUser;
	settings: ProfilesJsonSettings;
}
