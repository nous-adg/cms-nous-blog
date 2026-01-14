// Función helper para convertir URLs de YouTube a formato embed
const getYoutubeEmbedUrl = (url: string): string => {
  if (!url) return '';
  
  // Si ya es una URL de embed, devolverla tal cual
  if (url.includes('/embed/')) {
    return url;
  }
  
  // Extraer el ID del video de diferentes formatos de URL
  let videoId = '';
  
  // Formato: https://www.youtube.com/watch?v=VIDEO_ID
  const watchRegex = /[?&]v=([^&]+)/;
  const watchMatch = url.match(watchRegex);
  if (watchMatch) {
    videoId = watchMatch[1];
  }
  
  // Formato: https://youtu.be/VIDEO_ID
  const shortRegex = /youtu\.be\/([^?&]+)/;
  const shortMatch = url.match(shortRegex);
  if (shortMatch) {
    videoId = shortMatch[1];
  }
  
  // Si encontramos un ID, devolver la URL de embed
  if (videoId) {
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  }
  
  // Si no se pudo extraer el ID, devolver la URL original
  return url;
};

// Función para convertir HTML a bloques
export const parseHTMLToBlocks = (htmlContent: string) => {
  if (!htmlContent || typeof htmlContent !== 'string') {
    return { blocks: [] };
  }

  const blocks: any[] = [];
  
  // Crear un elemento DOM temporal para parsear el HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  const processNode = (node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();
      
      switch (tagName) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
          blocks.push({
            type: 'heading',
            level: parseInt(tagName.charAt(1)),
            content: element.textContent || '',
          });
          break;
          
        case 'p':
          blocks.push({
            type: 'paragraph',
            content: element.textContent || '',
          });
          break;
          
        case 'pre':
          const codeElement = element.querySelector('code');
          if (codeElement) {
            const language = Array.from(codeElement.classList)
              .find(cls => cls.startsWith('language-'))?.replace('language-', '') || 'javascript';
            
            blocks.push({
              type: 'code',
              language,
              content: codeElement.textContent || '',
            });
          }
          break;
          
        case 'ul':
          const listItems = Array.from(element.querySelectorAll('li')).map(li => li.textContent || '');
          blocks.push({
            type: 'bulletList',
            items: listItems,
          });
          break;
          
        case 'ol':
          const orderedItems = Array.from(element.querySelectorAll('li')).map(li => li.textContent || '');
          blocks.push({
            type: 'orderedList',
            items: orderedItems,
          });
          break;
          
        case 'blockquote':
          blocks.push({
            type: 'blockquote',
            content: element.textContent || '',
          });
          break;
          
        case 'img':
          blocks.push({
            type: 'image',
            src: element.getAttribute('src') || '',
            alt: element.getAttribute('alt') || '',
            title: element.getAttribute('title') || '',
          });
          break;
          
        case 'hr':
          blocks.push({
            type: 'divider',
          });
          break;
          
        case 'div':
          // Verificar si es un embed de YouTube
          const iframe = element.querySelector('iframe');
          if (iframe && iframe.getAttribute('src')?.includes('youtube')) {
            blocks.push({
              type: 'youtube',
              src: iframe.getAttribute('src') || '',
              width: iframe.getAttribute('width') || '640',
              height: iframe.getAttribute('height') || '360',
            });
          }
          break;
      }
      
      // Procesar hijos
      Array.from(node.childNodes).forEach(processNode);
    }
  };
  
  processNode(tempDiv);
  
  return { blocks };
};

/**
 * Convierte el formato de bloques del backend al formato JSON de Tiptap
 */
export const parseBlocksToTiptap = (blocksContent: any) => {
  // Si ya es formato Tiptap (tiene type: 'doc'), devolverlo tal cual
  if (blocksContent?.type === 'doc') {
    return blocksContent;
  }

  // Si es un string HTML, convertirlo a bloques primero
  if (typeof blocksContent === 'string') {
    const blocks = parseHTMLToBlocks(blocksContent);
    return convertBlocksToTiptap(blocks);
  }

  // Si tiene estructura de bloques, convertir
  if (!blocksContent?.blocks || !Array.isArray(blocksContent.blocks)) {
    return null;
  }

  return convertBlocksToTiptap(blocksContent);
};

// Función auxiliar para convertir bloques a formato Tiptap
const convertBlocksToTiptap = (blocksContent: any) => {
  const tiptapContent: any[] = [];

  blocksContent.blocks.forEach((block: any) => {
    switch (block.type) {
      case 'paragraph':
        tiptapContent.push({
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: block.content || '',
            },
          ],
        });
        break;

      case 'heading':
        tiptapContent.push({
          type: 'heading',
          attrs: {
            level: block.level || 2,
          },
          content: [
            {
              type: 'text',
              text: block.content || '',
            },
          ],
        });
        break;

      case 'code':
        tiptapContent.push({
          type: 'codeBlock',
          attrs: {
            language: block.language || 'javascript',
          },
          content: [
            {
              type: 'text',
              text: block.content || '',
            },
          ],
        });
        break;

      case 'bulletList':
        tiptapContent.push({
          type: 'bulletList',
          content: (block.items || []).map((item: string) => ({
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: item,
                  },
                ],
              },
            ],
          })),
        });
        break;

      case 'orderedList':
        tiptapContent.push({
          type: 'orderedList',
          content: (block.items || []).map((item: string) => ({
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: item,
                  },
                ],
              },
            ],
          })),
        });
        break;

      case 'blockquote':
        tiptapContent.push({
          type: 'blockquote',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: block.content || '',
                },
              ],
            },
          ],
        });
        break;

      case 'image':
        tiptapContent.push({
          type: 'image',
          attrs: {
            src: block.src || '',
            alt: block.alt || '',
            title: block.title || '',
          },
        });
        break;

      case 'divider':
        tiptapContent.push({
          type: 'horizontalRule',
        });
        break;

      case 'youtube':
        tiptapContent.push({
          type: 'youtube',
          attrs: {
            src: getYoutubeEmbedUrl(block.src || ''),
            width: block.width || 640,
            height: block.height || 360,
          },
        });
        break;

      default:
        // Para bloques desconocidos, crear un párrafo
        if (block.content) {
          tiptapContent.push({
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: block.content,
              },
            ],
          });
        }
        break;
    }
  });

  return {
    type: 'doc',
    content: tiptapContent,
  };
};
