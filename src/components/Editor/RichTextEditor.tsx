import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered, Quote, Heading2, Undo, Redo, Highlighter as HighlighterCircle } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start writing...'
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const toggleStyle = (active: boolean) =>
    `p-2 rounded-lg transition-colors ${
      active
        ? 'bg-secondary-100 text-secondary-800'
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="border-b border-gray-300 bg-white p-2 flex flex-wrap gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={toggleStyle(editor.isActive('bold'))}
          title="Bold"
        >
          <Bold className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={toggleStyle(editor.isActive('italic'))}
          title="Italic"
        >
          <Italic className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={toggleStyle(editor.isActive('heading', { level: 2 }))}
          title="Heading"
        >
          <Heading2 className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={toggleStyle(editor.isActive('bulletList'))}
          title="Bullet List"
        >
          <List className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={toggleStyle(editor.isActive('orderedList'))}
          title="Numbered List"
        >
          <ListOrdered className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={toggleStyle(editor.isActive('blockquote'))}
          title="Quote"
        >
          <Quote className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={toggleStyle(editor.isActive('highlight'))}
          title="Highlight"
        >
          <HighlighterCircle className="h-5 w-5" />
        </button>
        <div className="h-6 w-px bg-gray-300 mx-1" />
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`p-2 rounded-lg transition-colors ${
            editor.can().undo()
              ? 'text-gray-600 hover:bg-gray-100'
              : 'text-gray-400 cursor-not-allowed'
          }`}
          title="Undo"
        >
          <Undo className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`p-2 rounded-lg transition-colors ${
            editor.can().redo()
              ? 'text-gray-600 hover:bg-gray-100'
              : 'text-gray-400 cursor-not-allowed'
          }`}
          title="Redo"
        >
          <Redo className="h-5 w-5" />
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-[200px] focus:outline-none"
      />
    </div>
  );
};