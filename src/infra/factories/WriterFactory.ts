import { ArchiveWriter } from '../../domain/ArchiveWriter';
import { FolderWriter } from '../../domain/FolderWriter';
import { Pack } from '../../domain/Pack';
import { Target } from '../../domain/Target';
import { Writer, WriterCallback, WriterType } from '../../domain/Writer';


export class WriterFactory {
	public static CreateAsync(type: WriterType, target: Target, pack: Pack, callback: WriterCallback): Promise<void> {
		const writer = this.CreateWriter(type, target, pack);
		return writer.CreateAsync(callback);
	}

	private static CreateWriter(type: WriterType, target: Target, pack: Pack): Writer {
		switch (type) {
			case 'archive': return new ArchiveWriter(target, pack);
			default: return new FolderWriter(target, pack);
		}
	}
}
