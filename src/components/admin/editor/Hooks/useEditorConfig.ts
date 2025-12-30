import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import Youtube from '@tiptap/extension-youtube';
import { FontSize } from '../Extensions/FontSizeExtension';
import { EDITOR_CLASSES } from '../Utils/editorConstants';

export const useEditorConfig = () => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: {
            class: 'code-block',
          },
        },
        // Deshabilitar extensiones que se configurarán por separado
        link: false,
      }),
      Underline,
      TextStyle,
      FontSize,
      Placeholder.configure({
        placeholder: 'Escribe tu contenido aquí...',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: 'left',
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Youtube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: {
          class: 'youtube-video',
        },
        inline: false,
        nocookie: true,
      }),
    ],
    editorProps: {
      attributes: {
        class: EDITOR_CLASSES,
      },
    },
    parseOptions: {
      preserveWhitespace: 'full',
    },
  });

  return editor;
};
