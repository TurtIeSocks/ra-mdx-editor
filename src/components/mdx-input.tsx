'use client'

import {
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
} from '@mdxeditor/editor'
import {
  useInput,
  type TextInputProps,
  Labeled,
  InputHelperText,
  sanitizeInputRestProps,
  ResettableTextField,
  required as requiredValidator,
} from 'react-admin'
import { defaultInputPlugins } from './default-plugins'
import { styled, useThemeProps, TextFieldProps } from '@mui/material'
import React from 'react'

type LimitedMDXEditorProps = Omit<
  MDXEditorProps,
  | 'markdown'
  | 'readOnly'
  | 'spellCheck'
  | 'onChange'
  | 'ref'
  | 'onBlur'
  | 'onError'
>

/**
 * Props for the MdxInput component.
 *
 * Extends React Admin's `InputProps` and MDXEditor's `MDXEditorProps`.
 * Note: `markdown`, `onChange`, `ref`, and `onBlur` are omitted as they are
 * managed internally by `useInput` to bridge with the React Admin form state.
 */
export interface MdxInputProps extends TextInputProps {
  mdxProps?: LimitedMDXEditorProps
}

/**
 * An input component for React Admin that uses MDXEditor to provide a
 * rich WYSIWYG markdown editing experience.
 *
 * This component bridges the gap between React Admin's form state and
 * MDXEditor's state management, allowing it to work seamlessly within
 * `SimpleForm`, `TabbedForm`, and other React Admin form containers.
 *
 * @example <caption>Basic Usage</caption>
 * import { Edit, SimpleForm, TextInput } from 'react-admin';
 * import { MdxInput } from 'ra-mdx-editor';
 *
 * const PostEdit = () => (
 *     <Edit>
 *         <SimpleForm>
 *             <TextInput source="title" />
 *             <MdxInput source="body" />
 *         </SimpleForm>
 *     </Edit>
 * );
 *
 * @example <caption>With Custom Label and Validation</caption>
 * <MdxInput
 *     source="description"
 *     label="Product Description"
 *     validate={required()}
 * />
 *
 * @example <caption>Extending Default Plugins</caption>
 * import { MdxInput, defaultPlugins, headingsPlugin } from 'ra-mdx-editor';
 *
 * const plugins = [
 *     ...defaultPlugins,
 *     headingsPlugin({ allowedHeadingLevels: [1, 2, 3] })
 * ];
 *
 * <MdxInput source="content" plugins={plugins} />
 *
 * @example <caption>Custom Styling and Placeholder</caption>
 * <MdxInput
 *     source="summary"
 *     className="my-custom-editor"
 *     placeholder="Summarize the article..."
 *     autoFocus
 * />
 */
export const MdxInput = (props: MdxInputProps): React.JSX.Element => {
  const {
    label,
    fullWidth,
    helperText,
    required,
    resource,
    source,
    validate,
    mdxProps,
    readOnly,
    ...rest
  } = useThemeProps({
    props: props,
    name: PREFIX,
  })

  const validateWithRequired = React.useMemo(() => {
    if (!required) {
      return validate
    }

    const hasRequiredValidator = Array.isArray(validate)
      ? validate.some((rule) =>
          Boolean((rule as { isRequired?: boolean })?.isRequired)
        )
      : Boolean((validate as { isRequired?: boolean } | undefined)?.isRequired)

    if (hasRequiredValidator) {
      return validate
    }

    const requiredRule = requiredValidator()
    if (!validate) {
      return requiredRule
    }

    return Array.isArray(validate)
      ? [requiredRule, ...validate]
      : [requiredRule, validate]
  }, [required, validate])

  const {
    field,
    fieldState: { error, invalid },
    id,
    isRequired,
  } = useInput({
    resource,
    source,
    type: 'text',
    validate: validateWithRequired,
    isRequired: required,
    helperText,
    label,
    ...rest,
  })

  const [isFocused, setIsFocused] = React.useState(false)

  const handleBlurCapture = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>): void => {
      if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
        return
      }

      setIsFocused(false)
      field.onBlur()
    },
    [field, setIsFocused]
  )
  const handleFocusCapture = React.useCallback((): void => {
    setIsFocused(true)
  }, [setIsFocused])

  const slotProps = React.useMemo(
    () => ({ input: { readOnly, ...mdxProps } }),
    [mdxProps, readOnly]
  )

  return (
    <Labeled
      label={label}
      isRequired={isRequired}
      id={`${id}-label`}
      color={invalid ? 'error' : isFocused ? 'primary.main' : undefined}
      source={source}
      resource={resource}
      aria-readonly={readOnly}
      aria-disabled={rest['aria-disabled'] ?? rest.disabled}
      fullWidth={fullWidth}
    >
      <StyledResettableTextField
        id={id}
        slots={SLOTS}
        required={isRequired}
        slotProps={slotProps}
        {...field}
        error={invalid}
        helperText={
          helperText !== false || invalid ? (
            <InputHelperText error={error?.message} helperText={helperText} />
          ) : null
        }
        {...sanitizeInputRestProps(rest)}
        onFocusCapture={handleFocusCapture}
        onBlurCapture={handleBlurCapture}
        readOnly={readOnly}
      />
    </Labeled>
  )
}

// ========================================= HELPERS =========================================

interface EditorProps extends Omit<
  TextFieldProps,
  'onChange' | 'onBlur' | 'onFocus' | 'onError'
> {
  mdxProps?: LimitedMDXEditorProps
}

function Editor(props: EditorProps) {
  const ref = React.useRef<MDXEditorMethods>(null)

  const { value, spellCheck, mdxProps, ref: _, ...rest } = props

  const markdown = typeof value === 'string' ? value : ''

  React.useEffect(() => {
    if (!ref.current) {
      return
    }

    if (ref.current.getMarkdown() !== markdown) {
      ref.current.setMarkdown(markdown)
    }
  }, [markdown])

  return (
    <MDXEditor
      ref={ref}
      plugins={defaultInputPlugins}
      markdown={markdown}
      spellCheck={!!spellCheck}
      {...rest}
      {...mdxProps}
    />
  )
}

const PREFIX = 'RaMdxInput'

const StyledResettableTextField = styled(ResettableTextField, {
  name: PREFIX,
  overridesResolver: (_props, styles) => styles.root,
})({})

const SLOTS: React.ComponentProps<typeof StyledResettableTextField>['slots'] = {
  input: Editor,
}
