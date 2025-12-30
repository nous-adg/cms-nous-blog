import type { Editor } from '@tiptap/react';
import { LinkIcon, ImageIcon, VideoIcon, Minus } from 'lucide-react';
import { BUTTON_BASE_CLASS, BUTTON_ACTIVE_CLASS } from '../Utils/editorConstants';
import { addLink, addImage, addVideo } from '../Utils/editorHelpers';

interface MediaGroupProps {
  editor: Editor;
}

export const MediaGroup = ({ editor }: MediaGroupProps) => {
  return (
    <>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={BUTTON_BASE_CLASS}
        type="button"
      >
        <Minus className="text-[var(--color-secondary)]" size={18} />
      </button>

      <div className="w-px h-6 bg-gray-300/30 mx-1" />

      <button
        onClick={() => addLink(editor)}
        className={`${BUTTON_BASE_CLASS} ${editor.isActive('link') ? BUTTON_ACTIVE_CLASS : ''}`}
        type="button"
      >
        <LinkIcon className="text-[var(--color-secondary)]" size={18} />
      </button>
      <button
        onClick={() => addImage(editor)}
        className={BUTTON_BASE_CLASS}
        type="button"
      >
        <ImageIcon className="text-[var(--color-secondary)]" size={18} />
      </button>
      <button
        onClick={() => addVideo(editor)}
        className={BUTTON_BASE_CLASS}
        type="button"
      >
        <VideoIcon className="text-[var(--color-secondary)]" size={18} />
      </button>
    </>
  );
};
