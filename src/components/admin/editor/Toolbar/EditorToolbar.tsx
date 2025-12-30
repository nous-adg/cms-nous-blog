import type { Editor } from '@tiptap/react';
import { useState, useEffect } from 'react';
import { TextFormattingGroup } from './TextFormattingGroup';
import { TextAlignmentGroup } from './TextAlignmentGroup';
import { FontSizeSelector } from './FontSizeSelector';
import { ListsGroup } from './ListsGroup';
import { MediaGroup } from './MediaGroup';
import { ToolbarDivider } from './ToolbarDivider';

interface EditorToolbarProps {
  editor: Editor;
}

export const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  const [, setUpdateTrigger] = useState(0);

  useEffect(() => {
    // Forzar actualización del toolbar cuando cambia la selección o el contenido
    const updateToolbar = () => {
      setUpdateTrigger(prev => prev + 1);
    };

    editor.on('selectionUpdate', updateToolbar);
    editor.on('transaction', updateToolbar);

    return () => {
      editor.off('selectionUpdate', updateToolbar);
      editor.off('transaction', updateToolbar);
    };
  }, [editor]);

  return (
    <div className="p-2 flex gap-4 items-center mb-4">
      <TextFormattingGroup editor={editor} />
      
      <div className="w-px h-6 mx-4 bg-gray-600" />
      
      <TextAlignmentGroup editor={editor} />
      
      <ToolbarDivider />
      
      <FontSizeSelector editor={editor} />
      
      <ToolbarDivider />
      
      <ListsGroup editor={editor} />
      
      <ToolbarDivider />
      
      <MediaGroup editor={editor} />
    </div>
  );
};
