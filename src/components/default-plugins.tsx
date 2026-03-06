import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  UndoRedo,
  Separator,
  HighlightToggle,
  StrikeThroughSupSubToggles,
} from '@mdxeditor/editor'
import {
  headingsPlugin,
  imagePlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  linkDialogPlugin,
  type RealmPlugin,
} from '@mdxeditor/editor'

import { styled } from '@mui/material'

const StyledToolbar = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  gap: theme.spacing(0.5),
  flexWrap: 'wrap',
}))

/**
 * The default list of plugins used by MdxInput.
 * Includes support for headings, lists, quotes, thematic breaks,
 * markdown shortcuts, and a rich toolbar.
 */
export const defaultFieldPlugins: RealmPlugin[] = [
  headingsPlugin(),
  imagePlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  listsPlugin(),
  markdownShortcutPlugin(),
  quotePlugin(),
  tablePlugin(),
  thematicBreakPlugin(),
]

/**
 * The default list of plugins used by MdxInput.
 * Includes support for headings, lists, quotes, thematic breaks,
 * markdown shortcuts, and a rich toolbar.
 */
export const defaultInputPlugins = [
  ...defaultFieldPlugins,
  toolbarPlugin({
    toolbarContents: () => (
      <StyledToolbar className="ra-mdx-toolbar-container">
        <UndoRedo />
        <Separator />
        <BoldItalicUnderlineToggles />
        <HighlightToggle />
        <Separator />
        <StrikeThroughSupSubToggles />
        <Separator />
        <ListsToggle />
        <Separator />
        <BlockTypeSelect />
        <Separator />
        <CreateLink />
        <InsertImage />
        <Separator />
        <InsertTable />
        <InsertThematicBreak />
        <Separator />
        <CodeToggle />
      </StyledToolbar>
    ),
  }),
]
