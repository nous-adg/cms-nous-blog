import type { Editor } from '@tiptap/react';
import { List, ListOrdered, ListTree } from 'lucide-react';
import { BUTTON_BASE_CLASS, BUTTON_ACTIVE_CLASS, BUTTON_GROUP_CLASS } from '../Utils/editorConstants';

interface ListsGroupProps {
  editor: Editor;
}

export const ListsGroup = ({ editor }: ListsGroupProps) => {
  return (
    <div className={BUTTON_GROUP_CLASS}>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${BUTTON_BASE_CLASS} ${editor.isActive('bulletList') ? BUTTON_ACTIVE_CLASS : ''}`}
        type="button"
      >
        <List className="text-[var(--color-secondary)]" size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${BUTTON_BASE_CLASS} ${editor.isActive('orderedList') ? BUTTON_ACTIVE_CLASS : ''}`}
        type="button"
      >
        <ListOrdered className="text-[var(--color-secondary)]" size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${BUTTON_BASE_CLASS} ${editor.isActive('codeBlock') ? BUTTON_ACTIVE_CLASS : ''}`}
        type="button"
      >
        <ListTree className="text-[var(--color-secondary)]" size={18} />
      </button>
    </div>
  );
};
