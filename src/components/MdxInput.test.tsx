import { render, screen } from '@testing-library/react';
import { MdxInput } from './MdxInput';
import { AdminContext, SimpleForm } from 'react-admin';
import { describe, it, expect, vi } from 'vitest';

// Mock MDXEditor because it's heavy and relies on browser APIs not fully implemented in jsdom
// Mock MDXEditor deeply to avoid side-effects from sub-dependencies like Sandpack/Stitches
vi.mock('@mdxeditor/editor', () => {
  return {
    MDXEditor: vi.fn(({ markdown, onChange, placeholder, className }) => (
      <div data-testid="mdx-editor" className={className}>
        <textarea
          data-testid="mdx-textarea"
          value={markdown}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    )),
    headingsPlugin: vi.fn(),
    listsPlugin: vi.fn(),
    quotePlugin: vi.fn(),
    thematicBreakPlugin: vi.fn(),
    markdownShortcutPlugin: vi.fn(),
    toolbarPlugin: vi.fn(),
    UndoRedo: vi.fn(),
    BoldItalicUnderlineToggles: vi.fn(),
    BlockTypeSelect: vi.fn(),
    CodeToggle: vi.fn(),
    CreateLink: vi.fn(),
    InsertImage: vi.fn(),
    InsertTable: vi.fn(),
    InsertThematicBreak: vi.fn(),
    ListsToggle: vi.fn(),
  };
});

const renderWithAdmin = (ui: React.ReactNode) => {
  return render(
    <AdminContext>
      <SimpleForm onSubmit={vi.fn()} toolbar={false}>
        {ui}
      </SimpleForm>
    </AdminContext>
  );
};

describe('MdxInput', () => {
  it('renders correctly with default props', () => {
    renderWithAdmin(<MdxInput source="body" />);
    expect(screen.getByTestId('mdx-editor')).toBeInTheDocument();
  });

  it('passes value to editor', () => {
    renderWithAdmin(<MdxInput source="body" defaultValue="# Hello World" />);
    const textarea = screen.getByTestId('mdx-textarea') as HTMLTextAreaElement;
    expect(textarea.value).toBe('# Hello World');
  });

  it('applies custom className', () => {
    renderWithAdmin(<MdxInput source="body" className="custom-class" />);
    const editor = screen.getByTestId('mdx-editor');
    expect(editor).toHaveClass('custom-class');
  });

  it('passes placeholder to editor', () => {
    renderWithAdmin(<MdxInput source="body" placeholder="Test Placeholder" />);
    const textarea = screen.getByTestId('mdx-textarea');
    expect(textarea).toHaveAttribute('placeholder', 'Test Placeholder');
  });
});
