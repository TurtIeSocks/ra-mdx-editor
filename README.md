# ra-mdx-editor

MUI-aligned markdown components for [react-admin](https://marmelab.com/react-admin/) powered by [MDXEditor](https://mdxeditor.dev/).

## Exports

- `MdxInput`: rich MDX editor input for `Create` and `Edit` forms
- `MdxField`: read-only markdown renderer for `Show` layouts
- `defaultInputPlugins`: default plugin preset used by `MdxInput`
- `defaultFieldPlugins`: default plugin preset used by `MdxField`

## Installation

```bash
npm install ra-mdx-editor @mdxeditor/editor
```

You also need the standard react-admin + MUI stack in your app.

## Quick Start

```tsx
import {
  Edit,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextInput,
  TextField,
} from 'react-admin'
import { MdxInput, MdxField } from 'ra-mdx-editor'
import '@mdxeditor/editor/style.css'

export const PostEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" />
      <MdxInput source="body" />
    </SimpleForm>
  </Edit>
)

export const PostShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="title" />
      <MdxField source="body" />
    </SimpleShowLayout>
  </Show>
)
```

## MUI-Like Editing Experience

`MdxInput` now ships with:

- MUI-style focus ring, error border, and disabled state
- toolbar + content spacing aligned with MUI form controls
- RA-aware label/validation/helper text behavior

## Customizing Plugins

```tsx
import { MdxInput, defaultInputPlugins } from 'ra-mdx-editor'
import { headingsPlugin } from '@mdxeditor/editor'

<MdxInput
  source="body"
  mdxProps={{
    plugins: [
      ...defaultInputPlugins,
      headingsPlugin({ allowedHeadingLevels: [1, 2] }),
    ],
  }}
/>
```

```tsx
import { MdxField, defaultFieldPlugins } from 'ra-mdx-editor'
import { headingsPlugin } from '@mdxeditor/editor'

<MdxField
  source="body"
  plugins={[...defaultFieldPlugins, headingsPlugin({ allowedHeadingLevels: [2, 3] })]}
/>
```

## API Notes

`MdxInput` accepts react-admin input props (`source`, `label`, `validate`, `required`, `readOnly`, etc.).
Pass MDXEditor-specific props via `mdxProps`.

`mdxProps` accepts MDXEditor props except:

- `markdown`
- `onChange`
- `onBlur`
- `onError`
- `ref`
- `readOnly`
- `spellCheck`

Those are controlled by `MdxInput` to keep the editor in sync with react-admin form state.

`MdxField` accepts standard react-admin field props plus MDXEditor props (except `markdown`, `readOnly`, and `ref`).

- `MdxField` defaults to `defaultFieldPlugins`
- `MdxInput` defaults to `defaultInputPlugins`
- `MdxField` supports `emptyText` when the source value is missing

TypeScript helper types are also exported:

- `MdxInputProps`
- `MdxFieldProps`

## Publishing

This package is intended for npm publishing via GitHub Releases (`.github/workflows/publish.yml`).

Recommended pre-release checklist:

1. `npm run lint`
2. `npm run test`
3. `npm run build`
4. bump `version` in `package.json`
5. create a GitHub release

## Example App

Run the bundled example:

```bash
npm install
npm run build
cd example
npm install
npm run dev
```
