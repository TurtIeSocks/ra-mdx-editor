import {
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CodeToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useInput, type InputProps } from "react-admin";
import { useEffect, useRef, type JSX } from "react";

/**
 * The default list of plugins used by MdxInput.
 * Includes support for headings, lists, quotes, thematic breaks, 
 * markdown shortcuts, and a rich toolbar.
 */
export const defaultPlugins = [
  headingsPlugin(),
  listsPlugin(),
  quotePlugin(),
  thematicBreakPlugin(),
  markdownShortcutPlugin(),
  toolbarPlugin({
    toolbarContents: () => (
      <>
        {" "}
        <UndoRedo />
        <BoldItalicUnderlineToggles />
        <BlockTypeSelect />
        <CodeToggle />
        <CreateLink />
        <InsertImage />
        <InsertTable />
        <InsertThematicBreak />
        <ListsToggle />
      </>
    ),
  }),
];

/**
 * Props for the MdxInput component.
 * 
 * Extends React Admin's `InputProps` and MDXEditor's `MDXEditorProps`.
 * Note: `markdown`, `onChange`, `ref`, and `onBlur` are omitted as they are 
 * managed internally by `useInput` to bridge with the React Admin form state.
 */
export interface MdxInputProps extends InputProps, Omit<MDXEditorProps, 'markdown' | 'onChange' | 'ref' | 'onBlur'> {
  // We omit markdown/onChange/ref because they are handled by useInput
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
export const MdxInput = (props: MdxInputProps): JSX.Element => {
  const {
    source,
    label,
    helperText,
    defaultValue,
    validate,
    onBlur,
    onChange,
    ...rest
  } = props;

  const {
    id,
    field,
    fieldState: { isTouched, error },
    formState: { isSubmitted },
  } = useInput({ source, label, helperText, defaultValue, validate, onBlur, onChange });

  const ref = useRef<MDXEditorMethods>(null);

  // set the value of the editor when the form value changes
  // this is required to handle reset/undo in the form
  useEffect(() => {
    ref.current?.setMarkdown(field.value);
  }, [field.value]);

  return (
    <div className={`mdx-editor-input ${props.className || ''}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <MDXEditor
        ref={ref}
        markdown={field.value || ""}
        onChange={field.onChange}
        plugins={props.plugins || defaultPlugins}
        {...rest}
      />
      {(isTouched || isSubmitted) && error && (
        <span className="error">{error.message}</span>
      )}
    </div>
  );
};
