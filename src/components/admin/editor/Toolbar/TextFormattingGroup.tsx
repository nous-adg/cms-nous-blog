import type { Editor } from '@tiptap/react';
import { Bold, Italic, Underline as UnderlineIcon } from 'lucide-react';
import { BUTTON_BASE_CLASS, BUTTON_ACTIVE_CLASS } from '../Utils/editorConstants';

interface TextFormattingGroupProps {
  editor: Editor;
}

export const TextFormattingGroup = ({ editor }: TextFormattingGroupProps) => {
  return (
    <div className="bg-neutral-300/5 backdrop-blur-xl rounded-full px-2 py-1">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${BUTTON_BASE_CLASS} ${editor.isActive('bold') ? BUTTON_ACTIVE_CLASS : ''}`}
        type="button"
      >
        <Bold className="text-[var(--color-secondary)]" size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${BUTTON_BASE_CLASS} ${editor.isActive('italic') ? BUTTON_ACTIVE_CLASS : ''}`}
        type="button"
      >
        <Italic className="text-[var(--color-secondary)]" size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${BUTTON_BASE_CLASS} ${editor.isActive('underline') ? BUTTON_ACTIVE_CLASS : ''}`}
        type="button"
      >
        <UnderlineIcon className="text-[var(--color-secondary)]" size={18} />
      </button>
    </div>
  );
};
