import { Mark } from '@tiptap/core';

export const FontSize = Mark.create({
  name: 'fontSize',
  addOptions() {
    return {
      types: ['textStyle'],
    };
  },
  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.fontSize,
        renderHTML: (attributes: { fontSize?: string }) => {
          if (!attributes.fontSize) {
            return {};
          }
          return {
            style: `font-size: ${attributes.fontSize}; font-weight: bold;`,
          };
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'span[style*="font-size"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, any> }) {
    return ['span', HTMLAttributes, 0];
  },
});
