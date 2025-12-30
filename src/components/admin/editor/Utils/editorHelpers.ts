import type { Editor } from '@tiptap/react';
import { CLOUDINARY_CONFIG } from '@/lib/cloudinary';

export const addLink = (editor: Editor) => {
  const url = window.prompt('URL');
  if (url) {
    editor.chain().focus().setLink({ href: url }).run();
  }
};

export const addImage = (editor: Editor) => {
  if (!window.cloudinary) {
    const url = window.prompt('URL de la imagen');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
    return;
  }

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: CLOUDINARY_CONFIG.cloudName,
      uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
      folder: 'blog/content',
      multiple: false,
      maxFiles: 1,
      clientAllowedFormats: ['image'],
      sources: ['local', 'url', 'camera'],
      showAdvancedOptions: false,
      cropping: false,
      styles: {
        palette: {
          window: '#FFFFFF',
          windowBorder: '#90A0B3',
          tabIcon: '#16a34a',
          menuIcons: '#5A616A',
          textDark: '#000000',
          textLight: '#FFFFFF',
          link: '#16a34a',
          action: '#16a34a',
          inactiveTabIcon: '#0E2F5A',
          error: '#F44235',
          inProgress: '#16a34a',
          complete: '#20B832',
          sourceBg: '#E4EBF1',
        },
      },
    },
    (error: any, result: any) => {
      if (error) {
        alert('Error al subir la imagen');
        return;
      }

      if (result.event === 'success') {
        editor.chain().focus().setImage({ src: result.info.secure_url }).run();
      }
    }
  );

  widget.open();
};

export const addVideo = (editor: Editor) => {
  const url = window.prompt('URL del video de YouTube');
  if (url) {
    editor.chain().focus().setYoutubeVideo({ src: url }).run();
  }
};
