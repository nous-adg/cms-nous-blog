import type { Editor } from '@tiptap/react';
import { ChevronDown } from 'lucide-react';
import { FONT_SIZES } from '../Utils/editorConstants';

interface FontSizeSelectorProps {
  editor: Editor;
}

export const FontSizeSelector = ({ editor }: FontSizeSelectorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    if (size === 'normal') {
      editor.chain().focus().unsetMark('fontSize').run();
    } else {
      editor.chain().focus().setMark('fontSize', { fontSize: FONT_SIZES[size as keyof typeof FONT_SIZES] }).run();
    }
  };

  return (
    <div className="relative">
      <select
        onChange={handleChange}
        className="appearance-none p-2 rounded-full pl-4 pr-10 border border-green-500/40 hover:bg-gray-200/20 text-sm bg-[var(--color-secondary)]/5 backdrop-blur-xl cursor-pointer text-[var(--color-secondary)]"
        style={{
          backgroundImage: 'none',
        }}
      >
        <option value="normal" style={{ fontSize: '14px' }}>Texto normal</option>
        <option value="1" style={{ fontSize: '24px', fontWeight: 'bold' }}>Título 1</option>
        <option value="2" style={{ fontSize: '18px', fontWeight: 'bold' }}>Título 2</option>
        <option value="3" style={{ fontSize: '14px', fontWeight: 'bold' }}>Título 3</option>
      </select>
      <ChevronDown 
        size={16} 
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600"
      />
    </div>
  );
};
