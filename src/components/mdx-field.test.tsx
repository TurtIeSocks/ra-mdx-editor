import { render, screen } from '@testing-library/react'
import { AdminContext, RecordContextProvider } from 'react-admin'
import { describe, it, expect, vi } from 'vitest'
import { MdxField } from './mdx-field'

vi.mock('react-markdown', () => ({
  default: ({ children }: { children: string }) => (
    <div data-testid="markdown-output">{children}</div>
  ),
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
