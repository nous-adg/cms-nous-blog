import type { Editor } from '@tiptap/react';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import { BUTTON_BASE_CLASS, BUTTON_ACTIVE_CLASS, BUTTON_GROUP_CLASS } from '../Utils/editorConstants';

interface TextAlignmentGroupProps {
  editor: Editor;
}

export const TextAlignmentGroup = ({ editor }: TextAlignmentGroupProps) => {
  return (
    <div className={BUTTON_GROUP_CLASS}>
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`${BUTTON_BASE_CLASS} ${editor.isActive({ textAlign: 'left' }) ? BUTTON_ACTIVE_CLASS : ''}`}
        type="button"
      >
        <AlignLeft className="text-[var(--color-secondary)]" size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`${BUTTON_BASE_CLASS} ${editor.isActive({ textAlign: 'center' }) ? BUTTON_ACTIVE_CLASS : ''}`}
        type="button"
      >
        <AlignCenter className="text-[var(--color-secondary)]" size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`${BUTTON_BASE_CLASS} ${editor.isActive({ textAlign: 'right' }) ? BUTTON_ACTIVE_CLASS : ''}`}
        type="button"
      >
        <AlignRight className="text-[var(--color-secondary)]" size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`${BUTTON_BASE_CLASS} ${editor.isActive({ textAlign: 'justify' }) ? BUTTON_ACTIVE_CLASS : ''}`}
        type="button"
      >
        <AlignJustify className="text-[var(--color-secondary)]" size={18} />
      </button>
    </div>
  );
};
