export type TextComponent
	= string | string[]
	| RawTextComponent | RawTextComponent[];

export type RawTextComponent
	= PlainTextComponent
	| TranslatedTextComponent
	| ScoreboardTextComponent
	| EntityNameTextComponent
	| KeybindTextComponent;

interface ClickEvent {
	action: 'open_url' | 'open_file' | 'run_command' | 'suggest_command' | 'change_page' | 'copy_to_clipboard';
	value: string;
}

type HoverEvent
	= ShowTextHoverEvent
	| ShowItemHoverEvent
	| ShowEntityHoverEvent;

interface ShowTextHoverEvent {
	action: 'show_text';
	value: string;
	contents: TextComponent;
}

interface ShowItemHoverEvent {
	action: 'show_item';
	value: string;
	contents: {
		id: string,
		count?: number,
		tag?: string
	};
}

interface ShowEntityHoverEvent {
	action: 'show_entity';
	value: string;
	contents: {
		name?: TextComponent,
		type: string,
		id: string
	};
}

interface RawTextComponentBase {
	extra?: TextComponent;
	color?: string;
	font?: string;
	bold?: boolean;
	italic?: boolean;
	underlined?: boolean;
	strikethrough?: boolean;
	obfuscated?: boolean;
	insertion?: boolean;
	clickEvent?: ClickEvent;
	hoverEvent?: HoverEvent;
}

export interface PlainTextComponent extends RawTextComponentBase {
	text: string;
}

export interface TranslatedTextComponent extends RawTextComponentBase {
	translate: string;
	with?: TextComponent;
}

export interface ScoreboardTextComponent extends RawTextComponentBase {
	score: {
		name: string,
		objective: string,
		value?: string
	};
}

export interface EntityNameTextComponent extends RawTextComponentBase {
	selector: string;
}

export interface KeybindTextComponent extends RawTextComponentBase {
	keybind: string;
}

export interface NbtValuesTextComponent extends RawTextComponentBase {
	nbt: string;
	interpret?: boolean;
	block?: string;
	entity?: string;
	storage?: string;
}
