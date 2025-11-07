import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { $getRoot, createEditor } from 'lexical';
import { nodes } from '@/components/blocks/editor-00/nodes';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function parseJwt (token: string) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export const htmlToJson = (htmlString: string) => {
  try {
    const tempEditor = createEditor({
      namespace: 'RichTextConverter',
      nodes: [...nodes]
    });

    let result = '';

    tempEditor.update(
      () => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(htmlString, 'text/html');
        const nodes = $generateNodesFromDOM(tempEditor, dom);

        const root = $getRoot();
        root.append(...nodes);
      },
      { discrete: true }
    );

    result = JSON.stringify(tempEditor.getEditorState().toJSON());
    return result;
  } catch (error) {
    console.error('Failed to stringify editor state from html:', error);
    return '';
  }
};

const hasRoot = (json: string) => {
  try {
    const parsed = JSON.parse(json);
    return parsed && parsed.root && parsed.root.children;
  } catch {
    return false;
  }
};


export const jsonToHtml = (json: string) => {
  if (hasRoot(json)) {
    const editor = createEditor({
      namespace: 'RichText',
      nodes: [...nodes]
    });

    let html = '';

    try {
      editor.update(
        () => {
          const editorState = editor.parseEditorState(json);

          editorState.read(() => {
            const htmlString = $generateHtmlFromNodes(editor, null);
            html = htmlString;
          });
        },
        { discrete: true }
      );

      return html;
    } catch (error) {
      console.error('Failed to parse or set editor state from JSON:', error);
      return '';
    }
  }

  return json;
};