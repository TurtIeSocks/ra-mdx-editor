import { render, screen, waitFor } from '@testing-library/react'
import { MdxInput } from './mdx-input'
import { AdminContext, SaveButton, SimpleForm, Toolbar } from 'react-admin'
import { describe, it, expect, vi } from 'vitest'
import { MDXEditor } from '@mdxeditor/editor'
import userEvent from '@testing-library/user-event'

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
    imagePlugin: vi.fn(),
    linkPlugin: vi.fn(),
    listsPlugin: vi.fn(),
    quotePlugin: vi.fn(),
    tablePlugin: vi.fn(),
    thematicBreakPlugin: vi.fn(),
    markdownShortcutPlugin: vi.fn(),
    linkDialogPlugin: vi.fn(),
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
  }
})

const renderWithAdmin = (ui: React.ReactNode) => {
  return render(
    <AdminContext>
      <SimpleForm onSubmit={vi.fn()} toolbar={false}>
        {ui}
      </SimpleForm>
    </AdminContext>
  )
}

const renderWithAdminForm = (
  ui: React.ReactNode,
  onSubmit: (values: unknown) => void
) => {
  return render(
    <AdminContext>
      <SimpleForm
        onSubmit={onSubmit}
        toolbar={
          <Toolbar>
            <SaveButton alwaysEnable />
          </Toolbar>
        }
      >
        {ui}
      </SimpleForm>
    </AdminContext>
  )
}

describe('MdxInput', () => {
  it('renders correctly with default props', () => {
    renderWithAdmin(<MdxInput source="body" />)
    expect(screen.getByTestId('mdx-editor')).toBeInTheDocument()
  })

  it('passes value to editor', () => {
    renderWithAdmin(<MdxInput source="body" defaultValue="# Hello World" />)
    const textarea = screen.getByTestId('mdx-textarea') as HTMLTextAreaElement
    expect(textarea.value).toBe('# Hello World')
  })

  it('applies custom className', () => {
    const { container } = renderWithAdmin(
      <MdxInput source="body" className="custom-class" />
    )
    expect(container.querySelector('.custom-class')).toBeTruthy()
  })

  it('passes placeholder to editor', () => {
    renderWithAdmin(<MdxInput source="body" placeholder="Test Placeholder" />)
    const textarea = screen.getByTestId('mdx-textarea')
    expect(textarea).toHaveAttribute('placeholder', 'Test Placeholder')
  })

  it('passes a default plugin set to the editor', () => {
    renderWithAdmin(<MdxInput source="body" />)
    const editorCalls = vi.mocked(MDXEditor).mock.calls
    const editorProps = editorCalls[editorCalls.length - 1]?.[0]
    expect(Array.isArray(editorProps?.plugins)).toBe(true)
    expect(editorProps?.plugins?.length).toBeGreaterThan(0)
  })

  it('prevents submission when required and empty, then submits once filled', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    renderWithAdminForm(<MdxInput source="body" required />, onSubmit)

    await user.click(screen.getByRole('button', { name: /save/i }))

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled()
    })

    const textarea = screen.getByTestId('mdx-textarea')
    await user.type(textarea, 'A filled markdown body')

    await user.click(screen.getByRole('button', { name: /save/i }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })
    expect(onSubmit.mock.calls[0]?.[0]).toEqual(
      expect.objectContaining({ body: 'A filled markdown body' })
    )
  })
})
