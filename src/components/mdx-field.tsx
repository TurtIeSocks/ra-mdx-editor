import { useThemeProps } from '@mui/material'
import { BaseFieldProps, useFieldValue, useTranslate } from 'react-admin'
import type { JSX } from 'react'
import { MDXEditor, MDXEditorMethods, MDXEditorProps } from '@mdxeditor/editor'
import { defaultFieldPlugins } from './default-plugins'
import React from 'react'

export interface MdxFieldProps<RecordType extends RT = RT>
  extends
    BaseFieldProps<RecordType>,
    Omit<MDXEditorProps, 'ref' | 'readOnly' | 'markdown'> {
  emptyText?: string
}

export const MdxField = (inProps: MdxFieldProps): JSX.Element | null => {
  const ref = React.useRef<MDXEditorMethods>(null)

  const {
    emptyText,
    source,
    record,
    resource,
    plugins = defaultFieldPlugins,
    ...props
  } = useThemeProps({
    props: inProps,
    name: PREFIX,
  })

  const translate = useTranslate()
  const value = useFieldValue({ source, record })
  const markdown =
    value != null && typeof value !== 'string'
      ? value.toString()
      : value || (emptyText ? translate(emptyText, { _: emptyText }) : null)

  React.useEffect(() => {
    if (!ref.current) return

    if (ref.current.getMarkdown() !== markdown) {
      ref.current.setMarkdown(markdown)
    }
  }, [markdown])

  return (
    <MDXEditor
      ref={ref}
      readOnly
      plugins={plugins}
      markdown={markdown}
      {...props}
    />
  )
}

// ========================================= HELPERS =========================================

type RT = Record<string, unknown>

const PREFIX = 'RaMdxField'
