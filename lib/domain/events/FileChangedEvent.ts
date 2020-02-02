import { BaseFileEvent } from './BaseFileEvent';

export interface FileChangedEvent extends BaseFileEvent {
	Content: string;
}
