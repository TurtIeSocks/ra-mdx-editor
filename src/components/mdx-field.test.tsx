import { render, screen } from '@testing-library/react'
import { AdminContext, RecordContextProvider } from 'react-admin'
import { describe, it, expect, vi } from 'vitest'
import { MdxField } from './mdx-field'

vi.mock('@mdxeditor/editor', () => ({
  MDXEditor: ({ markdown }: { markdown?: string }) => (
    <div data-testid="markdown-output">{markdown}</div>
  ),
  headingsPlugin: vi.fn(),
  imagePlugin: vi.fn(),
  linkPlugin: vi.fn(),
  listsPlugin: vi.fn(),
  markdownShortcutPlugin: vi.fn(),
  quotePlugin: vi.fn(),
  tablePlugin: vi.fn(),
  thematicBreakPlugin: vi.fn(),
  linkDialogPlugin: vi.fn(),
  toolbarPlugin: vi.fn(),
  UndoRedo: vi.fn(),
  Separator: vi.fn(),
  BoldItalicUnderlineToggles: vi.fn(),
  HighlightToggle: vi.fn(),
  StrikeThroughSupSubToggles: vi.fn(),
  ListsToggle: vi.fn(),
  BlockTypeSelect: vi.fn(),
  CreateLink: vi.fn(),
  InsertImage: vi.fn(),
  InsertTable: vi.fn(),
  InsertThematicBreak: vi.fn(),
  CodeToggle: vi.fn(),
}))

describe('MdxField', () => {
  it('renders markdown from the record source', () => {
    render(
      <AdminContext>
        <RecordContextProvider value={{ id: 1, body: '# Hello' }}>
          <MdxField source="body" />
        </RecordContextProvider>
      </AdminContext>
    )

    expect(screen.getByTestId('markdown-output')).toHaveTextContent('# Hello')
  })

  it('renders emptyText when the source value is missing', () => {
    render(
      <AdminContext>
        <RecordContextProvider value={{ id: 1 }}>
          <MdxField source="body" emptyText="No content yet" />
        </RecordContextProvider>
      </AdminContext>
    )

    expect(screen.getByText('No content yet')).toBeInTheDocument()
  })
})
