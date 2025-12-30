import { EditorContent } from '@tiptap/react';
import { useEffect, useRef } from 'react';
import { useEditorConfig } from '../Hooks/useEditorConfig';
import { EditorToolbar } from '../Toolbar/EditorToolbar';
import { usePost } from '@/components/admin/posts/PostContext';

export const RichTextEditor = () => {
  const editor = useEditorConfig();
  const { updatePostData, postData } = usePost();
  const contentLoadedRef = useRef(false);

  useEffect(() => {
    if (!editor || !postData.content || contentLoadedRef.current) return;

    editor.commands.setContent(postData.content);
    contentLoadedRef.current = true;
  }, [editor, postData.content]);

  // Resetear la referencia cuando se limpia el post (nuevo post)
  useEffect(() => {
    if (!postData.id && contentLoadedRef.current) {
      contentLoadedRef.current = false;
    }
  }, [postData.id]);

  useEffect(() => {
    if (!editor) return;

    // Actualizar el contenido en el contexto cada vez que cambia el editor
    const updateContent = () => {
      const json = editor.getJSON();
      updatePostData({ content: json });
    };

    editor.on('update', updateContent);

    return () => {
      editor.off('update', updateContent);
    };
  }, [editor, updatePostData]);

  if (!editor) {
    return null;
  }

  return (
    <div className="container mx-auto rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-[var(--color-secondary)]">
        Contenido
      </h1>
      <EditorToolbar editor={editor} />
      
      <div className="glass rounded-xl text-white border border-white/5">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
